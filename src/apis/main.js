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
export const queryPost = ({offset}) => {
    return http({
        url: '/post/',
        method: 'POST',
        data: {offset}
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