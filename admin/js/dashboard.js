class Dashboard {
    constructor() {
        this.token = localStorage.getItem('github_token');
        if (!this.token) {
            window.location.href = 'index.html';
            return;
        }
        
        this.init();
    }

    async init() {
        this.bindEvents();
        await this.loadWorks();
    }

    bindEvents() {
        // 退出登录
        document.getElementById('logoutBtn').addEventListener('click', () => {
            localStorage.removeItem('github_token');
            window.location.href = 'index.html';
        });

        // 保存作品
        document.getElementById('saveWorkBtn').addEventListener('click', () => {
            this.saveWork();
        });
    }

    async loadWorks() {
        try {
            const response = await fetch('https://api.github.com/repos/wuxiang269/wuxiang269.github.io/issues?labels=work', {
                headers: {
                    'Authorization': `token ${this.token}`
                }
            });
            
            const works = await response.json();
            this.renderWorks(works);
        } catch (error) {
            console.error('Load works error:', error);
        }
    }

    async saveWork() {
        const form = document.getElementById('addWorkForm');
        const formData = new FormData(form);
        
        const data = {
            title: formData.get('title'),
            body: JSON.stringify({
                type: formData.get('type'),
                description: formData.get('description'),
                url: formData.get('url')
            }),
            labels: ['work']
        };

        try {
            const response = await fetch('https://api.github.com/repos/wuxiang269/wuxiang269.github.io/issues', {
                method: 'POST',
                headers: {
                    'Authorization': `token ${this.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                bootstrap.Modal.getInstance(document.getElementById('addWorkModal')).hide();
                form.reset();
                await this.loadWorks();
            } else {
                alert('保存失败，请重试');
            }
        } catch (error) {
            console.error('Save work error:', error);
            alert('保存失败，请重试');
        }
    }

    renderWorks(works) {
        const container = document.getElementById('worksList');
        container.innerHTML = works.map(work => {
            const data = JSON.parse(work.body);
            return `
                <div class="work-card p-3">
                    <div class="d-flex justify-content-between align-items-start">
                        <div>
                            <h5>${work.title}</h5>
                            <p class="text-muted mb-2">${data.description}</p>
                            <span class="badge bg-primary">${data.type}</span>
                        </div>
                        <div class="btn-group">
                            <button class="btn btn-sm btn-outline-primary" onclick="dashboard.editWork(${work.number})">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-danger" onclick="dashboard.deleteWork(${work.number})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }
}

// 初始化仪表板
const dashboard = new Dashboard(); 