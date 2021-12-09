//图片懒加载
class ImgLazyLoad {
    constructor() {}

    public imgList: Array<any> = [];//图片列表
    public length: number = 0;//图片总数
    public init() {
        this.imgList = [...document.querySelectorAll('img')];
        this.length = this.imgList.length;
        document.addEventListener('scroll', this.imgLazyLoad)
    }
    private imgLazyLoad = (() => {
        let count = 0
        return () => {
            let deleteIndexList: Array<number> = []
            this.imgList.forEach((img: any, index: number) => {
                let rect = img.getBoundingClientRect()
                if (rect.top < window.innerHeight) {//滚动到视图内触发
                    img.src = img.dataset.src
                    deleteIndexList.push(index)
                    count++
                    if (count === length) {
                        document.removeEventListener('scroll', this.imgLazyLoad)
                    }
                }
            })
            this.imgList = this.imgList.filter((img: any, index: number) => !deleteIndexList.includes(index))//删除已加载的图片
        }
    })()
}
export default ImgLazyLoad
