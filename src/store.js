import { proxy } from 'valtio'
const state = proxy({
  colors: ['#ddd', '#EFBD4E', '#80C670', '#726DE8', '#EF674E', '#353934'],
  color: '#EFBD4E',
  boxs: [{ color: '#ddd', pos: 0.1, id: 1 }],
  selectedID: 1
})
export { state }
