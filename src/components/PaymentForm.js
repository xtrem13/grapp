import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import SimpleReactValidator from 'simple-react-validator';
import PAYMENTTYPES from '../constants/paymentTypes';
import { oplataAdd } from '../redux/actions';

const PaymentForm = (props) => {
	const dispatch = useDispatch()
	const initialState = {
		OPL_DATA: "",
		OPL_SUMMA: "",
		OPL_TYPE: "",
		DOC_NUM: ""
	}
	const [paymentForm, setPaymentForm] = useState(initialState)
	const validator = useRef(new SimpleReactValidator())
	const [, forceUpdate] = useState();
	const changeHandler = (e) => {
		setPaymentForm({
			...paymentForm,
			[e.target.name]: e.target.value
		})
	}
	const saveOplata = (e) => {
		e.preventDefault()
		if (validator.current.allValid()) {
			dispatch(oplataAdd(paymentForm))
			setPaymentForm(initialState)
			document.getElementById("create-oplata-form").reset();
		} else {
			validator.current.showMessages();
			forceUpdate(1)
		}
	}
	return (
		<form className="paymentForm" id="create-oplata-form">
			<div className="row">
				<div className="col-md-2 mb-10">
					<div className="mb-10">Дата:</div>
					<input type="date" name="OPL_DATA" onChange={changeHandler} />
					{validator.current.message('OPL_DATA', paymentForm.OPL_DATA, 'required')}
				</div>
				<div className="col-md-3 mb-10">
					<div className="mb-10">Сумма оплаты:</div>
					<input type="number" name="OPL_SUMMA" onChange={changeHandler} />
					{validator.current.message('OPL_SUMMA', paymentForm.OPL_SUMMA, 'required')}
				</div>
				<div className="col-md-2 mb-10">
					<div className="mb-10">Вид оплаты:</div>
					<select name="OPL_TYPE" onChange={changeHandler}>
						{PAYMENTTYPES.map(item =>
							<option key={item.id} value={item.id}>{item.name}</option>
						)}
					</select>
					{validator.current.message('OPL_TYPE', paymentForm.OPL_TYPE, 'required')}
				</div>
				<div className="col-md-3 mb-10">
					<div className="mb-10">№ плат.документа / Примечание:</div>
					<input name="DOC_NUM" onChange={changeHandler} />
					{validator.current.message('DOC_NUM', paymentForm.DOC_NUM, 'required')}
				</div>
				<div className="col-md-2 mb-10 v-bottom">
					<button onClick={saveOplata}>Оплата</button>
				</div>
			</div>
		</form>
	)
}

export default PaymentForm;