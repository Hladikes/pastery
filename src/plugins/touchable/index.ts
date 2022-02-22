export function handlePressStateChanges(el: HTMLElement, cb: (state: boolean) => any) {
  let isTouchDevice: boolean = false
  let isDeviceTypeSet: boolean = false

  const mouseenter = () => {
    if (isDeviceTypeSet && isTouchDevice) return
    // console.log('mouseenter')
    isTouchDevice = false
    isDeviceTypeSet = true
    cb(true)
  }

  const mouseleave = () => {
    if (isDeviceTypeSet && isTouchDevice) return
    // console.log('mouseleave')
    cb(false)
  }

  const touchstart = () => {
    if (isDeviceTypeSet && !isTouchDevice) return
    // console.log('touchstart')
    isDeviceTypeSet = true
    isTouchDevice = true
    cb(true)
  }

  const touchend = () => {
    if (isDeviceTypeSet && !isTouchDevice) return
    // console.log('touchend')
    cb(false)
  }

  el.addEventListener('mouseenter', mouseenter, { passive: true })
  el.addEventListener('mouseleave', mouseleave, { passive: true })
  el.addEventListener('touchstart', touchstart, { passive: true })
  el.addEventListener('touchend', touchend, { passive: true })

  return () => {
    el.removeEventListener('mouseenter', mouseenter)
    el.removeEventListener('mouseleave', mouseenter)
    el.removeEventListener('touchstart', touchstart)
    el.removeEventListener('touchend', touchend)
  }
}
