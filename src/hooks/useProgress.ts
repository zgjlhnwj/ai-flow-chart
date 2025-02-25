import { ref, onMounted, onUnmounted } from 'vue'

export function useProgress(duration: number = 3000) {
    const progress = ref(0)
    let animationFrameId: number
    let startTime: number

    const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp

        const elapsed = timestamp - startTime
        const percentage = Math.min((elapsed / duration) * 100, 100)

        progress.value = Math.round(percentage)

        if (percentage < 100) {
            animationFrameId = requestAnimationFrame(animate)
        }
    }

    const startProgress = () => {
        startTime = 0
        progress.value = 0
        animationFrameId = requestAnimationFrame(animate)
    }

    const stopProgress = () => {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId)
        }
    }

    onMounted(() => {
        startProgress()
    })

    onUnmounted(() => {
        stopProgress()
    })

    return {
        progress,
        startProgress,
        stopProgress
    }
} 