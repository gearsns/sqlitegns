import React, { useEffect, useRef, createContext, useLayoutEffect, useReducer } from "react"
import Splitter from 'm-react-splitters'
import './Home.css'
import Schema from './Schema'
import QueryArea from './Query'
import { StoreProvider } from '../../store'
import { Layout } from 'antd'
import logoimage from "../../assets/images/logo.png"

const { Header, Content } = Layout

export const UserContext = createContext()

const Home = () => {
  const queryRef = useRef()

  const addQuery = () => {
    queryRef.current?.addQuery()
  }
  const addEdit = () => {
    queryRef.current?.addEdit()
  }

  return (
    <Layout>
      <Header
        style={{
          color: '#fff',
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          padding: '0 10px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <img src={logoimage} /> <h1 style={{ marginLeft: '10px' }}>sqlitegns</h1>
      </Header>
      <Content className="site-layout" style={{ padding: '0', overflow: 'hidden' }}>
        <div className="app" style={{ height: "calc(100% - 40px)", position: "absolute" }}>
          <StoreProvider>
            <Splitter
              position="vertical"
              primaryPaneMaxWidth="100%"
              primaryPaneMinWidth={0}
              primaryPaneWidth="255px"
            >
              <div className="placeholder _1">
                <Schema addEdit={addEdit} addQuery={addQuery} />
              </div>
              <div className="placeholder _2" style={{
                "textAlign": "left",
                "width": "100%",
                "height": "100%",
                "display": "block"
              }}>
                <QueryArea ref={queryRef} />
              </div>
            </Splitter>
          </StoreProvider>
        </div>
      </Content>
    </Layout >
  );
}

export default Home
