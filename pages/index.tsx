import React from 'react'
import Head from 'next/head'
import Layout from '../components/layout'
import { GetStaticProps } from 'next'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

export default function Home() {
    const options = {
  title: {
    text: 'My chart'
  },
  series: [{
    data: [1, 2, 3]
  }]
    }
  
    return (
      <Layout home>
    
        <Head>
          
                <title>BTC Address Balances over Time</title>
            </Head>
            <section>
                <div className="max-w-2xl mx-auto p-8 text-center">Chart goes here</div>
                <HighchartsReact
    highcharts={Highcharts}
    options={options}
          />
        
            </section>
        </Layout>
    )

  
}

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {}
    }
}



