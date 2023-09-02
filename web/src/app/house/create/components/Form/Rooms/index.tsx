import styles from './styles.module.scss'
import { ListRooms } from '../../ListRooms'
import { useRooms } from './useRooms'

export function Rooms() {
  const { handleSubmit, myRooms } = useRooms()
  return (
    <>
      <h2>Informe o que sua residência tem para oferecer</h2>
      <form
        id="house-1"
        onSubmit={handleSubmit}
        className={styles.containerRooms}
      >
        <ListRooms rooms={myRooms} />
      </form>
    </>
  )
}
