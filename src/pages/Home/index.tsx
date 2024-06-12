import { LightEffect } from '../../components/light-effect'
import { Banner } from './components/banner'
import { Footer } from './components/footer'
import { List } from './components/list'

export function Home() {
  return (
    <main className="relative flex h-full w-full flex-col">
      <Banner />
      <List />
      <Footer />

      <LightEffect />
    </main>
  )
}
