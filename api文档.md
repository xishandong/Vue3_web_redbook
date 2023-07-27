# 配套api文档

## 用户相关

### 登录

方法： POST

api： /login/

参数列表

| email    | password |
| -------- | -------- |
| 用户邮箱 | 用户密码 |

返回内容：

``` json
{
    "id": 12,
    "username": "测试用户",
    "avatar": "http://localhost:8000/static/img/avatar/12-Snipaste_2023-07-17_15-39-14.png",
    "signature": "暂时没有个性签名~",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6Imp3dCJ9.eyJ1c2VyX2lkIjoxMiwidXNlcm5hbWUiOiJcdTZkNGJcdThiZDVcdTc1MjhcdTYyMzciLCJleHAiOjE2OTExMTA1NzJ9.hLs8JK2L2Iqr-vjkH6pYxmEKHhHp-7HZgGpLUMjXVYY"
}
```

### 注册

方法： POST

api： /register/

参数列表

| username | email | password |
| -------- | ----- | -------- |
| 用户名   | 邮箱  | 密码     |

返回结果：

``` json
{'info': '创建用户成功'}
{'error': '该邮箱已被注册'}, status=401
{'error': '创建用户失败'}, status=401
```

### 获取用户关注，收藏帖子以及喜欢帖子

方法： GET

api：/user/focus/

返回结果：

``` json
{
    "follow": [
        10
    ],
    "collected": [
        103,
        118
    ],
    "favorites": [
        103,
        110,
        116,
        119
    ]
}
```

> 说明： 数组存放的对应id

### 用户个人信息更新

#### 头像图片上传

方法：POST

api：/user/avatar/

参数列表

| 文件对象   |
| ---------- |
| 图片文件流 |

返回结果：

``` json
{
    "filename": "113-1000g00823brn0aifq06g5nt1f31g8cpb1n1m0.jpg",
    "filepath": "http://localhost:8000/static/img/avatar/12-113-1000g00823brn0aifq06g5nt1f31g8cpb1n1m0.jpg"
}
```

> 说明： 图片文件名以及图片地址

#### 用户信息上传

方法：POST

api：/user/update/

参数列表：

| signature | username |
| --------- | -------- |
| 个性签名  | 用户名   |

返回结果：

``` json
{'info': '修改成功'}, status=200
```

### 用户关注

方法： POST

api：/focus/

参数列表：

| id         |
| ---------- |
| 关注用户id |

返回结果：

``` json
{
    "info": "成功关注"
}
```

### 取消关注

方法：POST

api：/user/unfollow/

参数列表

| id             |
| -------------- |
| 取消关注用户id |

返回结果：

``` json
{
  "info": "成功取消关注"
}
```

### 移除粉丝

方法：POST

api： /user/remove/fan/

参数列表

| id         |
| ---------- |
| 移除关注id |

### 用户主页用户信息

方法：POST

api：/index/

参数列表：

| id     |
| ------ |
| 用户id |

返回结果

``` josn
{
    "data": {
        "user": {
            "id": 9,
            "username": "回锅炒辣椒",
            "avatar": "http://localhost:8000/static/img/avatar/9-金智秀.jpg",
            "signature": "I love Rose~",
            "fans": 0,
            "focusOn": 0,
            "postsCount": 0
        }
    }
}
```

## 帖子相关

### 用户主页帖子

方法：POST

api：/user/post/

参数列表：

| offset           | types                                              | user_id |
| ---------------- | -------------------------------------------------- | ------- |
| 偏移量           | 想要获取的帖子类型                                 | 用户id  |
| 已获取的帖子数量 | 帖子：发布的帖子 收藏：收藏的帖子 点赞：点赞的帖子 |         |

返回结果：

``` json
{
    "info": [
        {
            "title": "分享今日学习",
            "id": 119,
            "img": "http://localhost:8000/static/img/post/119-1000g0082279ku2sfi05g5oqro2pm5jpbj0fvd.jpg",
            "img_info": {
                "height": 1706,
                "width": 1280
            },
            "load": false,
            "user": {
                "id": 12,
                "username": "测试用户1",
                "avatar": "http://localhost:8000/static/img/avatar/12-113-1000g00823brn0aifq06g5nt1f31g8cpb1n1m0.jpg"
            }
        },
        {
            "title": "好漂亮！！！",
            "id": 116,
            "img": "http://localhost:8000/static/img/post/116-1000g008285e08k2fu0005ovmamnjq23g55p7j.jpg",
            "img_info": {
                "height": 960,
                "width": 960
            },
            "load": false,
            "user": {
                "id": 12,
                "username": "测试用户1",
                "avatar": "http://localhost:8000/static/img/avatar/12-113-1000g00823brn0aifq06g5nt1f31g8cpb1n1m0.jpg"
            }
        },
        {
            "title": "每日分享",
            "id": 110,
            "img": "http://localhost:8000/static/img/post/110-1040g00830mvomp71l61g5o4spss0bntv972mk.jpg",
            "img_info": {
                "height": 1920,
                "width": 1440
            },
            "load": false,
            "user": {
                "id": 12,
                "username": "测试用户1",
                "avatar": "http://localhost:8000/static/img/avatar/12-113-1000g00823brn0aifq06g5nt1f31g8cpb1n1m0.jpg"
            }
        },
        {
            "title": "今日iu",
            "id": 103,
            "img": "http://localhost:8000/static/img/post/103-iu2.jpg",
            "img_info": {
                "height": 1439,
                "width": 1080
            },
            "load": false,
            "user": {
                "id": 12,
                "username": "测试用户1",
                "avatar": "http://localhost:8000/static/img/avatar/12-113-1000g00823brn0aifq06g5nt1f31g8cpb1n1m0.jpg"
            }
        }
    ]
}
```

### 主页帖子

方法： POST

api：/post/

参数列表：

| offset     |
| ---------- |
| 帖子偏移量 |

返回结果：

``` json
{
    "info": [
        {
            "title": "分享今日学习",
            "id": 119,
            "img": "http://localhost:8000/static/img/post/119-1000g0082279ku2sfi05g5oqro2pm5jpbj0fvd.jpg",
            "img_info": {
                "height": 1706,
                "width": 1280
            },
            "load": false,
            "user": {
                "id": 12,
                "username": "测试用户1",
                "avatar": "http://localhost:8000/static/img/avatar/12-113-1000g00823brn0aifq06g5nt1f31g8cpb1n1m0.jpg"
            }
        },
        {
            "title": "求解！！",
            "id": 118,
            "img": "http://localhost:8000/static/img/post/118-1000g0082g31g604i206g5oirr2kk1nuqs4qtu.jpg",
            "img_info": {
                "height": 2560,
                "width": 1920
            },
            "load": false,
            "user": {
                "id": 12,
                "username": "测试用户1",
                "avatar": "http://localhost:8000/static/img/avatar/12-113-1000g00823brn0aifq06g5nt1f31g8cpb1n1m0.jpg"
            }
        },
        {
            "title": "python学习",
            "id": 117,
            "img": "http://localhost:8000/static/img/post/117-1000g0082dv0lhf4gs0005o8flhd0bq6948mst.jpg",
            "img_info": {
                "height": 1707,
                "width": 1280
            },
            "load": false,
            "user": {
                "id": 12,
                "username": "测试用户1",
                "avatar": "http://localhost:8000/static/img/avatar/12-113-1000g00823brn0aifq06g5nt1f31g8cpb1n1m0.jpg"
            }
        },
        {
            "title": "好漂亮！！！",
            "id": 116,
            "img": "http://localhost:8000/static/img/post/116-1000g008285e08k2fu0005ovmamnjq23g55p7j.jpg",
            "img_info": {
                "height": 960,
                "width": 960
            },
            "load": false,
            "user": {
                "id": 12,
                "username": "测试用户1",
                "avatar": "http://localhost:8000/static/img/avatar/12-113-1000g00823brn0aifq06g5nt1f31g8cpb1n1m0.jpg"
            }
        },
        {
            "title": "可爱可爱",
            "id": 115,
            "img": "http://localhost:8000/static/img/post/115-1000g0082nbg996mji0005no6tlq08rku6ca0m.jpg",
            "img_info": {
                "height": 1350,
                "width": 1080
            },
            "load": false,
            "user": {
                "id": 12,
                "username": "测试用户1",
                "avatar": "http://localhost:8000/static/img/avatar/12-113-1000g00823brn0aifq06g5nt1f31g8cpb1n1m0.jpg"
            }
        }
    ]
}
```

### 帖子详情

方法：POST

api：/post/detail/

参数列表：

| id     |
| ------ |
| 帖子id |

返回结果：

``` json
{
    "info": {
        "title": "分享今日学习",
        "id": 119,
        "imgs": [
            "http://localhost:8000/static/img/post/119-1000g0082279ku2sfi05g5oqro2pm5jpbj0fvd.jpg"
        ],
        "user": {
            "id": 12,
            "username": "测试用户1",
            "avatar": "http://localhost:8000/static/img/avatar/12-113-1000g00823brn0aifq06g5nt1f31g8cpb1n1m0.jpg"
        },
        "createTime": "2023-07-27 18:03",
        "likeCount": 2,
        "collectCount": 1,
        "commentCount": 0,
        "content": ""
    }
}
```

> 说明： imgs存放所有图片，content的帖子内容，其余见文知意

### 删除帖子

方法： POST

api：/post/delete/

参数列表

| id     |
| ------ |
| 帖子id |

返回结果：

``` json
{'success': '帖子删除成功'}, status=200
{'error': '错误'}, status=401
```

### 帖子管理相关

方法：POST

api：/post/control/

参数列表：

| operator               | post_id | type                     |
| ---------------------- | ------- | ------------------------ |
| 执行操作               | 帖子id  | 操作类型                 |
| false：新增 true：删除 |         | like：喜欢 collect：收藏 |

返回结果：

``` json
{"info": "成功取消喜欢"}
{"info": "成功添加喜欢"}
...
```

### 发布帖子

#### 帖子主题内容

方法： POST

api： /upload/info/

参数列表：

| content          | title              | user_id                 |
| ---------------- | ------------------ | ----------------------- |
| 帖子内容，可为空 | 帖子标题，不可为空 | 用户id，与jwt数据做校验 |

返回结果：
``` json
{
    "data": "success",
    "info": 120
}
```

> 说明： info里面的是帖子的id，用于紧接着的图片上传做关联

#### 帖子图片上传

方法：POST

api：/upload/

参数列表：

| **id**                         | file   |
| ------------------------------ | ------ |
| 上传帖子主题内容获取到的帖子id | 图片流 |

返回结果：

``` json
{
    "data": "success"
}
```

### 用户管理页面数据获取

方法： POST

api：/user/post/control/

参数列表：

| offset | types                                                        |
| ------ | ------------------------------------------------------------ |
| 偏移量 | posts： 发布帖子 collected：收藏帖子 favorites：喜欢帖子 fans：粉丝管理 follow： 关注用户 |

返回结果：

``` json
用户相关：
{
    "info": [
        {
            "username": "测试用户1",
            "avatar": "http://localhost:8000/static/img/avatar/12-113-1000g00823brn0aifq06g5nt1f31g8cpb1n1m0.jpg",
            "id": 12,
            "fans": 1,
            "follow": 1,
            "note": 21
        }
    ],
    "total": 1
}
帖子相关：
{
    "info": [
        {
            "date": "2023-07-27 21:40",
            "title": "桥本~~",
            "likeCount": 0,
            "collectCount": 0,
            "commentCount": 0,
            "content": "",
            "id": 120,
            "username": "回锅炒辣椒"
        }
    ],
    "total": 1
}
```

## 评论相关

### 发布评论

方法：POST

api：/comment/

参数列表

| content  | post_id |
| -------- | ------- |
| 评论内容 | 帖子id  |

返回结果：

``` json
{
    "info": "评论已发送！",
    "id": 127
}
```

> 说明： id为该条评论id

### 回复主评

方法：POST

api：/comment/

参数列表：

| content  | parent_comment_id | post_id |
| -------- | ----------------- | ------- |
| 评论内容 | 主评的id          | 帖子id  |

返回结果：

``` json
{
    "info": "评论已发送！",
    "id": 128
}
```

> 说明： id为该条评论id

### 获取帖子主评

方法：POST

api：/comment/main/

参数列表：

| offset   | id     |
| -------- | ------ |
| 评论位移 | 帖子id |

返回结果：

``` json
{
    "info": [
        {
            "id": 127,
            "content": "123",
            "createTime": "2023-07-27 21:51",
            "user": {
                "id": 9,
                "username": "回锅炒辣椒",
                "avatar": "http://localhost:8000/static/img/avatar/9-金智秀.jpg"
            },
            "replyCount": 1,
            "replies": []
        }
    ]
}
```

> 说明：replies为空是为了保持响应式，也可以在后端修改在获取主评时带上若干条子评

### 获取评论子评

方法： POST

api：/comment/reply/

参数列表：

| offset   | id     |
| -------- | ------ |
| 评论偏移 | 主评id |

返回结果：

``` json
{
    "info": [
        {
            "id": 128,
            "content": "123",
            "createTime": "2023-07-27 21:53",
            "user": {
                "id": 9,
                "username": "回锅炒辣椒",
                "avatar": "http://localhost:8000/static/img/avatar/9-金智秀.jpg"
            }
        }
    ],
    "count": 1
}
```

> 说明：count为这次的评论数量