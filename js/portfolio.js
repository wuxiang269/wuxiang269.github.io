/**
 * 作品数据
 * @type {Array<Object>}
 */
const portfolioWorks = [
    {
        title: "项目一",
        description: "项目描述...",
        image: "../images/work1.jpg",
        category: "web",
        link: "#"
    },
    {
        title: "项目二",
        description: "项目描述...",
        image: "../images/work2.jpg",
        category: "app",
        link: "#"
    },
    {
        title: "项目三",
        description: "项目描述...",
        image: "../images/work3.jpg",
        category: "other",
        link: "#"
    }
];

/**
 * 加载作品列表
 * @param {string} filter 筛选类别
 */
function loadPortfolio(filter = 'all') {
    const container = document.querySelector('.portfolio-grid');
    if (!container) return;

    container.innerHTML = '';
    
    const filteredWorks = filter === 'all' 
        ? portfolioWorks 
        : portfolioWorks.filter(work => work.category === filter);

    filteredWorks.forEach(work => {
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
        container.innerHTML += workCard;
    });
}

// 绑定筛选按钮事件
document.addEventListener('DOMContentLoaded', () => {
    loadPortfolio();

    const filterButtons = document.querySelectorAll('.portfolio-filter button');
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // 更新按钮状态
            filterButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            
            // 筛选作品
            const filter = e.target.getAttribute('data-filter');
            loadPortfolio(filter);
        });
    });
}); 