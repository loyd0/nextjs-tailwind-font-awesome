import Head from 'next/head'

const Layout = ({ className, title }) => {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={`w-full min-h-screen ${className}`}>

            </main>
        </div>
    )
}

Layout.propTypes = {

}

export default Layout
