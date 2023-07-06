import http from "@/utils/http";

export const test = () => {
    return http({
        url: '/home/new'
    })
}