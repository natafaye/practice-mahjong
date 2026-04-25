import type { ReactNode } from "react"

type Props = {
  children?: ReactNode
}

export default function ModalFooter({ children }: Props) {
  return (
    <div className="mt-6 flex gap-2 justify-end">
      {children}
    </div>
  )
}