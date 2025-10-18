export default {
  installCommand: 'npm install',
  buildCommand: 'npm run vercel-build',
  devCommand: 'npm run dev',
  framework: 'nuxtjs',
  
  functions: {
    '**/__fallback.func': {
      includeFiles: 'node_modules/@prisma/client/**'
    }
  }
}
