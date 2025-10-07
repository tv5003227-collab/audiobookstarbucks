
document.addEventListener('DOMContentLoaded', function() {
    console.log('Audio Book Ready!');
    
    document.querySelectorAll('.play-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const audioId = this.getAttribute('data-audio');
            const audio = document.getElementById(audioId);
            
            if (!audio) return;
            
            document.querySelectorAll('audio').forEach(a => {
                if (a !== audio && !a.paused) {
                    a.pause();
                    const otherBtn = document.querySelector(`[data-audio="${a.id}"]`);
                    if (otherBtn) {
                        otherBtn.textContent = '▶';
                        otherBtn.classList.remove('playing');
                    }
                }
            });
            
            if (audio.paused) {
                audio.play().then(() => {
                    this.textContent = '❚❚';
                    this.classList.add('playing');
                });
            } else {
                audio.pause();
                this.textContent = '▶';
                this.classList.remove('playing');
            }
        });
    });
    
    document.querySelectorAll('audio').forEach(audio => {
        audio.addEventListener('loadedmetadata', function() {
            console.log('Audio metadata loaded:', this.id, 'Duration:', this.duration);
        });
        
        audio.addEventListener('timeupdate', function() {
            const controls = this.closest('.audio-player').querySelector('.controls');
            const progress = controls.querySelector('.progress-bar .progress');
            const timeDisplay = controls.querySelector('.time');
            
            if (progress && this.duration && this.duration > 0 && !isNaN(this.duration)) {
                const percent = (this.currentTime / this.duration) * 100;
                progress.style.width = percent + '%';
            } else {
                progress.style.width = '50%';
            }
            
            if (timeDisplay) {
                const minutes = Math.floor(this.currentTime / 60);
                const seconds = Math.floor(this.currentTime % 60);
                timeDisplay.textContent = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
            }
        });
        
        audio.addEventListener('ended', function() {
            const btn = document.querySelector(`[data-audio="${this.id}"]`);
            const progress = this.closest('.audio-player').querySelector('.controls .progress-bar .progress');
            if (btn) {
                btn.textContent = '▶';
                btn.classList.remove('playing');
            }
            if (progress) {
                progress.style.width = '0%';
            }
        });
    });
    
    document.querySelectorAll('.progress-bar').forEach(bar => {
        bar.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            const audioPlayer = this.closest('.audio-player');
            const audio = audioPlayer.querySelector('audio');
            
            if (audio && audio.duration && !isNaN(audio.duration)) {
                audio.currentTime = percent * audio.duration;
            }
        });
    });
});
const modal = document.getElementById('textModal');
const showTextBtn = document.querySelector('.show-text-btn');
const closeBtn = document.querySelector('.close-btn');

if (showTextBtn && modal) {
    // Показать окно
    showTextBtn.addEventListener('click', function() {
        modal.style.display = 'block';
    });
    
    // Закрыть окно
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Закрыть при клике вне окна
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}
