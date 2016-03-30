package com.ezb.jdb.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.ezb.jdb.common.Constants;
import com.ezb.jdb.common.PageResult;
import com.ezb.jdb.common.ResponseData;
import com.ezb.jdb.common.ResponseState;
import com.ezb.jdb.dao.*;
import com.ezb.jdb.model.Topic;
import com.ezb.jdb.model.TopicCmt;
import com.ezb.jdb.model.TopicType;
import com.ezb.jdb.model.User;
import com.ezb.jdb.service.IPicService;
import com.ezb.jdb.service.ITopicService;
import com.ezb.jdb.tool.JdbMd5Util;
import org.apache.commons.lang.StringUtils;
import org.joda.time.DateTime;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashSet;
import java.util.List;

/**
 * 话题
 * author : liufeng
 * create time: 2015/8/7 10:36.
 */
@Service
public class TopicServiceImpl implements ITopicService {

    @Resource
    private TopicDao topicDao;

    @Resource
    private TopicCmtDao topicCmtDao;

    @Resource
    private UserDao userDao;

    @Resource
    private AccessKeyDao accessKeyDao;

    @Resource
    private IPicService picServiceImpl;

    @Resource
    private TopicTypeDao topicTypeDao;

    public String queryTopic(PageResult<Topic> pageResult,
                             String phone,
                             String speColumnId,
                             String type,
                             String labelId,
                             Boolean isShield,
                             Boolean isOneUser) {

        if (StringUtils.isEmpty(phone)) {
            return ResponseState.INVALID_PHONE;
        }

        return ResponseData.getResData(
                topicDao.queryTopic(
                        pageResult,
                        phone,
                        speColumnId,
                        type,
                        labelId,
                        isShield,
                        isOneUser)
        );
    }

    public Topic queryTopicById(Integer id) {
        return topicDao.get(Topic.class, id);
    }

    public Topic queryTopicById(String phone, Integer id) {
        Topic topic = topicDao.get(Topic.class, id);
        String accessKey = JdbMd5Util.Md5(DateTime.now().toString(Constants.HOUR_FMT) + phone + "queryTopicById" + id);
        //更新pv
        if (!accessKeyDao.exist(accessKey, Constants.ACCKEY_TOPIC)) {
            accessKeyDao.add(accessKey, Constants.ACCKEY_TOPIC);
            topic.setPv(topic.getPv() + 1);
            topicDao.update(topic);
        }
        return topic;
    }

    public String addTopic(HttpServletRequest request, Topic topic, String phone) {

        User user = userDao.queryByPhone(phone);
        if (null != user) {

            String rpath = picServiceImpl.uploadResizeCut(request, Constants.PIC_WIDTH, Constants.PIC_HEIGHT);
            if (StringUtils.equals(rpath, ResponseState.PIC_ERR)) {
                return ResponseState.PIC_SAVE_ERR_JSON;
            }

            if (null == topic.getTopicType() || null == topic.getTopicType().getId()) {
                return ResponseState.TOPICTYPE_MISS;
            }
            TopicType topicType = topicTypeDao.get(TopicType.class, topic.getTopicType().getId());
            topic.setTopicType(topicType);
            topic.setPicPath(rpath);
            topic.setCreateUser(user);
            topic.setCreateTime(new Date());
            topic.setPv(0);
            topic.setState(1);
            topicDao.add(topic);
            return ResponseData.getResData(topic);
        } else {
            return ResponseState.INVALID_PHONE;
        }
    }

    public PageResult<Topic> query(PageResult<Topic> pageResult,
                                   Integer id,
                                   String title,
                                   String startTime,
                                   String endTime,
                                   String username,
                                   String realName,
                                   String type,
                                   String state) {

        return topicDao.query(pageResult, id, title, startTime,
                endTime, username, realName, type, state);
    }

    public String state(Integer id) {
        Topic topic = topicDao.get(Topic.class, id);
        if (null == topic) {
            return ResponseState.INVALID_ID;
        }
        if (topic.getState() == 1) {
            topic.setState(0);
        } else {
            topic.setState(1);
        }
        topicDao.update(topic);
        return ResponseState.SUCCESS;
    }

    public String lv(String phone, Integer id) {
        User user = userDao.queryByPhone(phone);
        if (null == user) {
            return ResponseState.INVALID_PHONE;
        }
        Topic topic = topicDao.get(Topic.class, id);
        if (null == topic) {
            return ResponseState.INVALID_ID;
        }
        if (null == topic.getLikedUser()) {
            topic.setLikedUser(new HashSet<User>());
        }
        topic.getLikedUser().add(user);
        topic.setLv(topic.getLikedUser().size());
        return ResponseState.SUCCESS;
    }

    public String sv(String phone, Integer id) {
        User user = userDao.queryByPhone(phone);
        if (null == user) {
            return ResponseState.INVALID_PHONE;
        }
        Topic topic = topicDao.get(Topic.class, id);
        if (null == topic) {
            return ResponseState.INVALID_ID;
        }
        if (null == topic.getSharedUser()) {
            topic.setSharedUser(new HashSet<User>());
        }
        topic.getSharedUser().add(user);
        topic.setSv(topic.getSharedUser().size());
        return ResponseState.SUCCESS;
    }

    public String view(String phone, Integer id) {
        Topic Topic = queryTopicById(phone, id);//话题实体
        List<TopicCmt> comments = topicCmtDao.qTopicCmtByTopicId(id);
        for (TopicCmt topicCmt : comments) {
            topicCmt.setChildCmtCount(topicCmtDao.qChildCmtCount(topicCmt.getId()));
        }
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("topic", Topic);
        jsonObject.put("comments", comments);
        return ResponseData.getResData(jsonObject);
    }
}
