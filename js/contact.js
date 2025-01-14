/**
 * 处理表单提交
 */
document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    try {
        // 这里可以添加发送表单数据的逻辑
        // 例如发送到后端API或邮件服务
        console.log('表单数据:', formData);
        
        // 显示成功消息
        alert('留言已发送！');
        e.target.reset();
    } catch (error) {
        console.error('发送失败:', error);
        alert('发送失败，请稍后重试');
    }
}); 