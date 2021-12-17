class EventBus {
    private events: any = {}
    public on(type: string, callback: Function) {//增加订阅
        if(!this.events[type]) {
            this.events[type] = [callback];
        } else {
            this.events[type].push(callback);
        }
    }
    public off(type: string, callback: Function) {//删除订阅
        if(!this.events[type]) return;
        this.events[type] = this.events[type].filters((v: Function) => v !== callback);
    }
    public once(type: string, callback: Function) {//只执行一次
        function fn (this: any, ...rest: any[]) {
            callback.apply(this, rest);
            this.off(type, fn);
        }
        this.on(type, fn);
    }
    public emit(type: string, ...rest: any[]) { // 触发事件
        this.events[type] && this.events[type].forEach((fn: Function) => fn.apply(this, rest));
    }
}

export default new EventBus();