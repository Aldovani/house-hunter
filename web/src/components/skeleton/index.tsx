import styles from './styles.module.scss'
interface SkeletonProps {
  width?: number | string
  heigh?: number | string
  radius?: number | string
}
export function Skeleton({ heigh, radius, width }: SkeletonProps) {
  return (
    <div
      className={styles.container}
      style={{
        maxWidth: width || '100%',
        height: heigh || '100%',
        borderRadius: radius || '0',
      }}
    ></div>
  )
}
