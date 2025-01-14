/**
 * 作品数据
 * @type {Array<Object>}
 */
const works = [
    {
        title: "项目一",
        description: "项目描述...",
        image: "images/work1.jpg",
        link: "#"
    },
    {
        title: "项目二",
        description: "项目描述...",
        image: "images/work2.jpg",
        link: "#"
    }
];

/**
 * 加载作品列表
 */
function loadWorks() {
    const worksContainer = document.querySelector('.featured-works .row');
    if (!worksContainer) return;

    works.forEach(work => {
        const workCard = `
            <div class="col-md-4 mb-4">
                <div class="card work-card">
                    <img src="${work.image}" class="card-img-top" alt="${work.title}">
                    <div class="card-body">
                        <h5 class="card-title">${work.title}</h5>
                        <p class="card-text">${work.description}</p>
                        <a href="${work.link}" class="btn btn-primary">查看详情</a>
                    </div>
                </div>
            </div>
        `;
        worksContainer.innerHTML += workCard;
    });
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    loadWorks();
}); 