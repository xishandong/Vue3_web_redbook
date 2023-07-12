import {ref} from "vue";
import {useUserStore} from "@/stores/user";
import {getCurrentTime} from "@/utils/getTime";
import {postDetail} from "@/apis/main";

export const controlDetail = () => {
    const detail = ref({})
    const comments = ref([])
    // 评论内容
    const content = ref('')
    const userStore = useUserStore()

    const afterDoComment = (comment) => {
        const info = [{
            user: userStore.userInfo,
            content: comment.content,
            createTime: getCurrentTime()
        }]
        comments.value = [...comments.value, ...info]
    }

    const getDetail = async (id) => {
        const res = await postDetail({id});
        detail.value = res.info
        comments.value = res.info.comment
    }

    return {
        detail,
        comments,
        content,
        afterDoComment,
        getDetail
    }
}