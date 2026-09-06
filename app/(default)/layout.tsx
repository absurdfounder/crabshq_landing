import Footer from '@/components/ui/footer'
import Newsletter from '@/components/newsletter'
import RecentlyShippedSection from '@/components/RecentlyShippedSection'
import SectionShell from '@/components/ui/SectionShell'

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* bg-canvas, not bg-gray-50: the `gray` override below 100 falls through
          to stock #f9fafb, a cool white. Outside the max-w-7xl rail that put
          ~100px of blue-tinted gutter either side of a warm #FAFAF8 page. */}
      <main className="grow bg-canvas">
        {children}
      </main>

      <SectionShell rhythm eyebrow="Updates" bgClass="bg-canvas">
        <RecentlyShippedSection />
      </SectionShell>

      {/* No eyebrowNumber — the newsletter is site chrome, not a numbered
          section, and it used to render a third [08] after the page's own. */}
      <SectionShell
        eyebrow="Deploy Orders"
        bgClass="bg-canvas"
        noBorderBottom={false}
      >
        <Newsletter />
      </SectionShell>
      <Footer />
    </>
  )
}
