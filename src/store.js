import { proxy } from 'valtio'
import { Box } from './Canvas'
const state = proxy(
  {  
    colors: ['#ddd', '#EFBD4E', '#80C670', '#726DE8', '#EF674E', '#353934'],
    color: '#EFBD4E',
    boxs: [{color: '#726DE8', pos: 0.1, id: 1}]
  })
export { state }
