import UserInfoIndex from './user_info/UserInfoIndex'

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	const { msgAlert } = props

	return (
		<>
			<h2>Phone Book App</h2>
			<UserInfoIndex msgAlert={ msgAlert }/>
		</>
	)
}

export default Home
