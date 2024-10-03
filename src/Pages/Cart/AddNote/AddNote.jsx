import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../../Store/actions/modalActions'
import { Dialog } from '@mui/material'

const AddNote = ({ isModalOpen, setAddNote, noteCartId }) => {
    console.log( noteCartId, "noteCartId")
    const dispatch = useDispatch()
    const { cartItems, loading, error } = useSelector((state) => state.cartItems);
    const filteredCartItems = cartItems.filter(item => item.cart_id !== noteCartId);
    console.log("filteredCartItems", filteredCartItems)
    console.log("cartItems", cartItems)
    const handleClose = () => {
        dispatch(closeModal())
        setAddNote(false)
    }

    const handleSubmit = () => {
        event.preventDefault();
    }

    return (
        <>
            <Dialog className=""
                open={isModalOpen}
                onClose={handleClose}
            >
                <form onSubmit={handleSubmit}>
                    <div className="p-6">

                        <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add note/instruction </label>
                        <textarea id="message" rows="4" class="block p-2.5 w-[30rem] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300" placeholder="Write your instruction here..."></textarea>

                    </div>
                    <div className="flex justify-end p-4 gap-4">
                        <button onClick={handleClose} className="text-gray-700">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-primary px-5 py-1 text-white hover:bg-opacity-80 rounded-md"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </Dialog>
        </>
    )
}

export default AddNote
