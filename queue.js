class Queue {
    constructor() {
        this.items = {}
        this.frontIndex = 0// tail of snake
        this.backIndex = 0// head of snake
    }
    enqueue(item) {
        this.items[this.backIndex] = item
        this.backIndex++
        return item + ' inserted'
    }
    dequeue() {
        const item = this.items[this.frontIndex]
        delete this.items[this.frontIndex]
        this.frontIndex++
        return item
    }
    peek() {
        return this.items[this.frontIndex]
    }

    peek_front(){
        return this.items[this.backIndex]
    }

    get_length(){
        return this.items.length;
    }

    get printQueue() {
        return this.items;
    }
}