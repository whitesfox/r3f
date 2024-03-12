import { motion, AnimatePresence } from 'framer-motion'
import { useSnapshot } from 'valtio'
import { state } from './store'

export function Overlay() {
  const transition = { type: 'spring', duration: 0.8 }
  const config = {
    initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0.5 } },
    animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
    exit: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } }
  }
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
      <AnimatePresence>
        <motion.section key="custom" {...config}>
          <Customizer />
        </motion.section>
      </AnimatePresence>
    </div>
  )
}

function Customizer() {
  const snap = useSnapshot(state)
  // const items = state((state) => state.items)
  console.log(snap.boxs)
  return (
    <div className="customizer">
      <div className="color-options">
        {snap.colors.map((color) => (
          <div
            key={color}
            className={`circle`}
            style={{ background: color, transform: `scale(${state.color === color ? 1.2 : 1})` }}
            onClick={() => (state.color = color)}></div>
        ))}
      </div>
      <div className="button-options">
        <button
          className="button"
          onClick={() => (state.boxs = [...state.boxs, { color: state.color, pos: state.boxs.length / 2, id: state.boxs.length + 1 }])}>
          Add
        </button>
        <button className="button" style={{ background: '#e00011' }} onClick={() => (state.boxs = snap.boxs.filter((item) => item.id !== snap.selectedID))}>
          Delete
        </button>
      </div>
    </div>
  )
}
