
const debounce = (fn, wait) => {
    let timer;
    return (...args) => {
        clearInterval(timer)
        timer = setTimeout(() => fn(...args), wait)
    }
}

const KEYMAP = {
    "Command": "Meta",
    "Option": "Alt",
}
class HotKey {
    constructor(hotKeyMap, interval = 200, element = window) {
        this.hotKeyMap = hotKeyMap
        this.interval = interval

        this.keys = []

        element.addEventListener('keydown', this.onKeyDown)
        element.addEventListener('keyup', this.onKeyUp)
    }

    onKeyDown(e) {
        // const 
    }

    onKeyUp(e) {

    }
}