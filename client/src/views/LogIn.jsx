import React from 'react'
import httpClient from '../httpClient'
import { Form } from 'semantic-ui-react'

class LogIn extends React.Component {
    state = {
        fields: { email: '', password: '' }
    }

    onInputChange(evt) {
        this.setState({
            fields: {
                ...this.state.fields,
                [evt.target.name]: evt.target.value
            }
        })
    }

    onFormSubmit(evt) {
		evt.preventDefault()
		httpClient.logIn(this.state.fields).then(user => {
			this.setState({ fields: { email: '', password: '' } })
			if(user) {
				this.props.onLoginSuccess(user)
				this.props.history.push('/')
			}
		})
	}
	
	render() {
		const { email, password } = this.state.fields
		return (
			<div className='LogIn'>
				<div className='row'>
					<div className='column column-33 column-offset-33'>
						<h1>Log In</h1>
						<Form onChange={this.onInputChange.bind(this)} onSubmit={this.onFormSubmit.bind(this)}>
                                <Form.Group widths='equal'>
                                    
                                    <Form.Input label="Email" placeholder="Email" name="email" value={email} />
                                    <Form.Input label="Password" placeholder="Password" name="password" value={password} />
                                    <Form.Button>Log In</Form.Button>
                                    
                                </Form.Group>
                            </Form>
					</div>
				</div>
			</div>
		)
	}
}

export default LogIn