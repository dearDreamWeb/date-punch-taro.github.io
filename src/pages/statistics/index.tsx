import { useRef, useState, useEffect } from 'react'
import { View, Canvas } from '@tarojs/components'
import { createCanvasContext, CanvasContext, getSystemInfoSync } from '@tarojs/taro'
import { rand } from '../../utils/utils'
import './index.less'

const MAXNUM = 50

interface BubbleProps {
  size: number;
  x: number;
  y: number;
  speed: number;
  xLeft?: boolean;
}

interface DrawGradientProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color1: string;
  color2: string;
  r?: number;
  type?: 'linear' | 'circle'
}

export default function home() {
  const { windowWidth, windowHeight } = getSystemInfoSync()
  const canvasRef = useRef(null)
  const [ctx, setCtx] = useState<CanvasContext>()
  let rotate = useRef(0).current
  let bubbleArr = useRef<BubbleProps[]>([])
  let freshTime = useRef<number>(0)
  let fishArr = useRef<any[]>([
    { x: windowWidth / 2, y: windowHeight / 2, originX: windowWidth / 2, originY: windowHeight / 2, r: 100, enlarge: true, scale: 1, isUp: true }
  ])

  const getBubbleData = (xLeft?: boolean): BubbleProps => {
    return {
      size: rand(2, 5),
      x: rand(5, windowWidth - 5),
      y: windowHeight + rand(5, 40),
      speed: rand(1, 5),
      xLeft: typeof xLeft === 'boolean' ? xLeft : Math.random() > 0.5,
    }
  }

  useEffect(() => {
    if (!ctx) {
      setCtx(createCanvasContext('canvas'))
      return;
    }
    for (let i = 0; i < MAXNUM; i++) {
      bubbleArr.current.push({
        ...getBubbleData()
      })
    }
    canvasInit()
  }, [ctx])

  const canvasInit = () => {
    if (!ctx) {
      return;
    }
    ctx.clearRect(0, 0, windowWidth, windowHeight)
    drawGradient({
      x1: windowWidth / 2,
      y1: 0,
      x2: windowWidth / 2,
      y2: windowHeight,
      color1: '#150869',
      color2: '#000004',
    })
    let flag = freshTime.current % 30 === 0;

    bubbleArr.current.forEach((item, index) => {
      const { x, y, speed } = item;
      if (y < 0 || x < 0 || x > windowWidth) {
        bubbleArr.current[index] = { ...getBubbleData() }
      } else {
        const xSpeed = speed * Math.tan(5 * Math.PI / 180)
        if (flag) {
          bubbleArr.current[index].xLeft = !bubbleArr.current[index].xLeft
        }

        bubbleArr.current[index] = {
          ...item,
          x: item.xLeft ? x - xSpeed : x + xSpeed,
          y: y - speed,
        }
      }
      drawCircle({
        x: item.x,
        y: item.y,
        r: item.size,
        fillColor: '#1E90FF'
      })
    })
    bubbleArr.current = [...bubbleArr.current]
    freshTime.current++;
    if (freshTime.current > 10000) {
      freshTime.current = 0;
    }

    fishesAnimation();
    ctx.draw()
    requestAnimationFrame(canvasInit)
  }

  /**
   * 渐变
   * @param param0
   * @returns
   */
  const drawGradient = ({ x1, y1, r, x2, y2, color1, color2, type = 'linear' }: DrawGradientProps) => {
    if (!ctx) {
      return;
    }
    ctx.save()

    if (type === 'linear') {
      let linearGradient = ctx.createLinearGradient(x1, y1, x2, y2);
      linearGradient.addColorStop(0, color1);
      linearGradient.addColorStop(1, color2);
      ctx.setFillStyle(linearGradient)
      ctx.fillRect(y1, y1, x2 * 2, y2)
    } else {
      let circularGradient = ctx.createCircularGradient(x1, y1, r!);
      circularGradient.addColorStop(0, color1);
      circularGradient.addColorStop(1, color2);
      ctx.setFillStyle(circularGradient)
      ctx.fillRect(0, 0, windowWidth, windowHeight)
    }


    ctx.restore()
  }

  /**
   * 画圆
   * @param param0
   * @returns
   */
  const drawCircle = ({ x, y, r, fillColor = '#000' }) => {
    if (!ctx) {
      return;
    }
    ctx.save()
    ctx.beginPath()
    ctx.fillStyle = fillColor
    ctx.arc(x, y, r, 0, 2 * Math.PI)
    ctx.stroke()
    ctx.fill()
    ctx.restore()
  }


  /**
   * 鱼动起来
   */
  const fishesAnimation = () => {
    fishArr.current.forEach((_, index) => {
      const item = fishArr.current[index];
      const ySpeed = rand(item.r / 80, item.r / 40);
      const nowScale = rand(0.004, 0.009)
      if (item.isUp) {
        if (item.y > item.originY - item.r) {
          item.y -= ySpeed;
        } else {
          item.isUp = false;
          item.y += ySpeed;
        }
      } else {
        if (item.y < item.originY + item.r) {
          item.y += ySpeed;
        } else {
          item.isUp = true;
          item.y -= ySpeed;
        }
      }
      const maxScale = 1.15;
      const minScale = 0.9
      if (item.enlarge) {
        if (item.scale < maxScale) {
          item.scale = Math.max(item.scale + nowScale, maxScale)
        } else {
          item.enlarge = false;
          item.scale = Math.max(item.scale - nowScale, minScale)
        }
      } else {
        if (item.scale > minScale) {
          item.scale = Math.max(item.scale - nowScale, minScale)
        } else {
          item.enlarge = true;
          item.scale = Math.max(item.scale + nowScale, maxScale)
        }
      }
      const { x, y, r, scale } = item
      let rgb = {
        r: 0,
        g: 0,
        b: 0
      }
      // if (Math.random() > 0.95) {
      //   rgb = {
      //     r: rand(0, 255),
      //     g: rand(0, 255),
      //     b: rand(0, 255)
      //   }
      //   drawGradient({ x1: x, y1: y, x2: x + r * 1.5, y2: y + r * 1.5, r: r * 1.8, color1: `rgba(${rgb.r},${rgb.g},${rgb.b},0.5)`, color2: 'rgba(21, 8, 105,0.5)', type: 'circle' })
      // }
      fish({ x, y, r, scale, rgb })
    })
  }

  /**
   * 鱼
   * @param param0
   * @returns
   */
  const fish = ({ x, y, r, scale, rgb }: { x: number; y: number; r: number; scale: number; rgb: { r: number; g: number; b: number; } }) => {
    if (!ctx) {
      return;
    }

    const eyeballRadius = r / 10;
    const eyeballRadiusBlack = eyeballRadius / 3;
    ctx.save()
    drawCircle({ x, y, r: r * scale, fillColor: `rgba(${rgb.r},${rgb.g},${rgb.b},0.5)` })
    // 左眼球
    drawCircle({ x: x - eyeballRadius, y: y - r, r: eyeballRadius, fillColor: '#fff' })
    // 右眼球
    drawCircle({ x: x + eyeballRadius, y: y - r, r: eyeballRadius, fillColor: '#fff' })
    // 左眼珠
    drawCircle({ x: x - eyeballRadius, y: y - r, r: eyeballRadiusBlack, fillColor: '#000' })
    // 右眼珠
    drawCircle({ x: x + eyeballRadius, y: y - r, r: eyeballRadiusBlack, fillColor: '#000' })
    // 嘴巴
    const mouthW = r / 3;
    ctx.fillStyle = '#000'
    ctx.fillRect(x - mouthW / 2, y - r / 5 * 3, mouthW, 2)
    ctx.restore()
  }

  return (
    <View>
      <Canvas ref={canvasRef} style={{ width: `${windowWidth}px`, height: `${windowHeight}px` }} canvasId='canvas'></Canvas>
    </View>
  )
}
