import { createFileRoute } from '@tanstack/react-router'
import { useWindowVirtualizer } from '@tanstack/react-virtual'
import * as React from 'react'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: IndexComponent,
})

const texts = {
  1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec nisl nec nisi ultricies tristique. Nullam nec lacus nec massa tincidunt semper',
  2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec nisl nec nisi ultricies tristique. Nullam nec lacus nec massa tincidunt semper Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec nisl nec nisi ultricies tristique. Nullam nec lacus nec massa tincidunt semper Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec nisl nec nisi ultricies tristique. Nullam nec lacus nec massa tincidunt semper Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec nisl nec nisi ultricies tristique. Nullam nec lacus nec massa tincidunt semper Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec nisl nec nisi ultricies tristique. Nullam nec lacus nec massa tincidunt semper Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec nisl nec nisi ultricies tristique. Nullam nec lacus nec massa tincidunt semper',
}

if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual'
}

function IndexComponent() {
  const virtualizer = useWindowVirtualizer({
    count: 200,
    getItemKey: (index) => index,
    estimateSize: (index) => {
      let sum = 98

      return sum
    },

    initialRect: {
      width: 300,
      height: 500,
    },
  })

  return (
    <div>
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((item) => {
          return (
            <div
              key={item.key}
              data-index={item.index}
              ref={virtualizer.measureElement}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${
                  item.start - virtualizer.options.scrollMargin
                }px)`,
              }}
            >
              <div style={{ border: '1px solid black' }}>
                <Item />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const Item = () => {
  const [large, setLarge] = useState(false)
  return (
    <div>
      <div>{large ? texts[2] : texts[1]}</div>
      <div style={{ textAlign: 'center' }}>
        <button
          style={{ backgroundColor: 'black', color: 'white' }}
          onClick={() => setLarge(!large)}
        >
          {large ? 'Shrink' : 'Expand'}
        </button>
      </div>
    </div>
  )
}
