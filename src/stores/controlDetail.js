import {ref} from "vue";
import {useUserStore} from "@/stores/user";
import {postDetail} from "@/apis/main";

export const controlDetail = () => {
    const detail = ref({})
    const comments = ref([])
    // 评论内容
    const content = ref('')
    const userStore = useUserStore()

    const afterDoComment = () => {
        detail.value.commentCount += 1
    }

    const getDetail = async (id) => {
        const res = await postDetail({id});
        detail.value = res.info
        document.title = detail.value.title;
    }

    const SetComment = (comment) => {
        comments.value = [...comments.value, ...comment]
    }


    return {
        detail,
        comments,
        content,
        afterDoComment,
        getDetail,
        SetComment
    }
}