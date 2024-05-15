package com.goncalves.API.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.goncalves.API.entities.notification.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
public class NotificationService {

    @Autowired
    private RedisTemplate redisTemplate;
    private final ObjectMapper objectMapper;
    private final String NOTIFICATION_PREFIX = "notification:";

    public NotificationService(RedisTemplate<String, String> redisTemplate, ObjectMapper objectMapper) {
        this.redisTemplate = redisTemplate;
        this.objectMapper = objectMapper;
    }

    public void saveNotification(Notification notification, long expirationSeconds) {
        try {
            String notificationJson = objectMapper.writeValueAsString(notification);
            redisTemplate.opsForValue().set(NOTIFICATION_PREFIX + notification.getId(), notificationJson, expirationSeconds, TimeUnit.SECONDS);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public String getCache(String key) {
        try {
            return (String) redisTemplate.opsForValue().get(key);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }


    public String getCacheByUser(){
        for (Object keyObj : redisTemplate.keys("*")) {
            String key = (String) keyObj;
            if (key.startsWith(NOTIFICATION_PREFIX)) {
                return (String) redisTemplate.opsForValue().get(key);
            }
        }
        return null;
    }
}