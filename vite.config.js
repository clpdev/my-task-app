import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => {
  return {
    plugins: [react()],
    // 本番ビルド時のみリポジトリ名をベースパスにする
    base: command === 'build' ? '/my-task-app/' : '/',
  }
})