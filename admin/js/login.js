// 处理登录逻辑
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const token = document.getElementById('token').value;
    
    // 验证 token
    try {
        const response = await fetch('https://api.github.com/user', {
            headers: {
                'Authorization': `token ${token}`
            }
        });
        
        if (response.ok) {
            // 保存 token
            localStorage.setItem('github_token', token);
            // 跳转到控制面板
            window.location.href = 'dashboard.html';
        } else {
            alert('Token 无效，请检查后重试');
        }
    } catch (error) {
        alert('登录失败，请稍后重试');
        console.error('Login error:', error);
    }
}); 