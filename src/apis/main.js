import http from "@/utils/http";

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

export const queryUserIndex = ({id}) => {
    return http({
        url: '/index/',
        method: 'POST',
        data: {
            id
        }
    })
}

export const uploadPost = (data) => {
    return http({
        url: '/upload/info/',
        method: 'POST',
        data: data
    })
}

export const postDetail = ({id}) => {
    return http({
        url: '/post/detail/',
        method: 'POST',
        data: {
            id
        }
    })
}

export const queryPost = ({offset}) => {
    return http({
        url: '/post/',
        method: 'POST',
        data: {offset}
    })
}

export const doComment = ({data}) => {
    return http({
        url: '/comment/',
        method: 'POST',
        data: data
    })
}
