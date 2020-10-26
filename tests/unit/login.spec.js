import { expect } from 'chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import sinon from 'sinon'
import { Auth } from "@/services/Auth"
import Login from '@/views/Login.vue'

import VueRouter from 'vue-router'
import myRoutes from "./mocks/routes"

const localVue = createLocalVue()

localVue.use(VueRouter)

const router = new VueRouter(myRoutes)

describe('Login.vue',() => {
    it('Muestra mensaje de error con credenciales inconrrectas', () =>{
        const wrapped = shallowMount (Login)
        wrapped.setData({credentials: {email:'', password:''}})
        wrapped.find('button').trigger('click')
        expect(wrapped.text()).to.include('Usuario o Contraseña incorrectos, Intente nuevamente.')
    }),
    it('No muestra mensaje de error con credenciales inconrrectas', async () =>{
        sinon.stub(Auth, 'login').resolves({status:200})
        const fakePush = sinon.spy(router, 'push')
        const wrapped = shallowMount (Login, (router))
        wrapped.setData({credentials: {email:'hola@gmail.com', password:'123456'}})
        wrapped.find('button').trigger('click')
        await wrapped.vm.$nextTick()
        expect(wrapped.text()).to.not.include('Usuario o Contraseña incorrectos, Intente nuevamente.')
        expect(fakePush.called).to.equal(1)
    })
})
