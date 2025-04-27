// Escaping function for safe display
function escapeHTML(str) {
    return str.replace(/[&<>"'`=\/]/g, (char) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '/': '&#x2F;',
      '`': '&#x60;',
      '=': '&#x3D;',
    })[char]);
  }
  
  // Toast Notification
  function showToast(message, isError = false) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.style.background = isError ? '#e53935' : '#4caf50';
    toast.classList.add('show');
  
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
  
  // Secure Form Handling
  document.getElementById('commentForm').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const commentInput = document.getElementById('comment').value.trim();
    const outputCard = document.getElementById('resultCard');
    const outputDiv = document.getElementById('output');
  
    if (!commentInput) {
      showToast('Comment cannot be empty!', true);
      return;
    }
  
    const sanitizedComment = escapeHTML(commentInput);
  
    outputDiv.textContent = sanitizedComment;
    outputCard.classList.remove('hidden');
  
    showToast('Comment submitted securely! ✅');
  
    this.reset();
  });
  