export function waterFallInit(columns, card_columns, arrHeight, cards) {
    columns.value = waterfall_column()
    card_columns.value = {}
    arrHeight.value = []
    for (let i = 0; i < columns.value; i++) {
        card_columns.value[i] = []
    }
    for (let i = 0; i < cards.value.length; i++) {
        var height = cards.value[i].img_info.height / (cards.value[i].img_info.width / 250)
        if (i < columns.value) {
            card_columns.value[i].push(cards.value[i])
            arrHeight.value.push(height)
        } else {
            let obj = {
                minH: arrHeight.value[0],
                minI: 0
            }
            for (let j = 0; j < arrHeight.value.length; j++) {
                if (arrHeight.value[j] < obj.minH) {
                    obj.minH = arrHeight.value[j]
                    obj.minI = j
                }
            }
            card_columns.value[obj.minI].push(cards.value[i])
            arrHeight.value[obj.minI] += height
        }
    }
}

export function waterFallMore(arrHeight, card_columns, more) {
    for (let i = 0; i < more.length; i++) {
        var height = more[i].img_info.height / (more[i].img_info.width / 250)
        let obj = {
            minH: arrHeight.value[0],
            minI: 0
        }
        for (let j = 0; j < arrHeight.value.length; j++) {
            if (arrHeight.value[j] < obj.minH) {
                obj.minH = arrHeight.value[j]
                obj.minI = j
            }
        }
        card_columns.value[obj.minI].push(more[i])
        arrHeight.value[obj.minI] += height
    }
}

export function resizeWaterFall(columns, card_columns, arrHeight, cards) {
    var timerId = null;
    window.onresize = function () {
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(() => {
            waterFallInit(columns, card_columns, arrHeight, cards)
        }, 300)
    }
}

function waterfall_column() {
    // 1.获取主容器的宽度
    var content = document.getElementById('content')
    var contentWidth = content.offsetWidth
    return Math.floor(contentWidth / (280))
}