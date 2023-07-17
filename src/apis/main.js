import http from "@/utils/http";

// 登录
export const login = ({email, password}) => {
    return http({
        url: '/login/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            email,
            password
        }
    })
}


// 注册
export const Register = ({email, username, password}) => {
    return http({
        url: '/register/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            username,
            password,
            email
        }
    })
}

// 访问用户主页
export const queryUserIndex = ({id}) => {
    return http({
        url: '/index/',
        method: 'POST',
        data: {
            id
        }
    })
}

// 上传帖子
export const uploadPost = (data) => {
    return http({
        url: '/upload/info/',
        method: 'POST',
        data: data
    })
}

// 帖子详情
export const postDetail = ({id}) => {
    return http({
        url: '/post/detail/',
        method: 'POST',
        data: {
            id
        }
    })
}

// 主页帖子
export const queryPost = ({offset, query}) => {
    return http({
        url: '/post/',
        method: 'POST',
        data: {offset, query}
    })
}

// 评论帖子
export const doComment = ({data}) => {
    return http({
        url: '/comment/',
        method: 'POST',
        data: data
    })
}

// 用户关注
export const doFocus = ({id}) => {
    return http({
        url: '/focus/',
        method: 'POST',
        data: {id}
    })
}

// 获取用户关注
export const queryUserFocus = () => {
    return http({
        url: '/user/focus/',
    })
}

export const unFollow = ({id}) => {
    return http({
        url: '/user/unfollow/',
        method: 'POST',
        data: {id}
    })
}

export const updateUserInfo = ({username, signature}) => {
    return http({
        url: '/user/update/',
        method: 'POST',
        data: {
            username,
            signature
        }
    })
}

export const queryUserPost = ({user_id, types, offset}) => {
    return http({
        url: '/user/post/',
        method: 'POST',
        data: {
            user_id,
            types,
            offset
        }
    })
}

export const controlUserCollectOrLike = ({post_id, operator, type}) => {
    return http({
        url: '/post/control/',
        method: 'POST',
        data: {
            post_id,
            type,
            operator
        }
    })
}

export const getComment = ({id, offset}) => {
    return http({
        url: '/comment/main/',
        method: 'POST',
        data: {
            id,
            offset
        }
    })
}

export const queryUserPostControl = ({offset, types}) => {
    return http({
        url: '/user/post/control/',
        method: 'POST',
        data: {
            offset,
            types
        }
    })
}

export const postDelete = ({id}) => {
    return http({
        url: '/post/delete/',
        method: 'POST',
        data: {
            id
        }
    })
}

export const removeFan = ({id}) => {
    return http({
        url: '/user/remove/fan/',
        method: 'POST',
        data: {
            id
        }
    })
}

export const loadReplies = ({id, offset}) => {
    return http({
        url: '/comment/reply/',
        method: 'POST',
        data: {
            id,
            offset
        }
    })
}
