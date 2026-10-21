import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../api'

// TODO: build the Report Item page — see README.md "Your task".
// This page is already routed at /items/new (report) and /items/:id (edit),
// and both routes are wrapped in <ProtectedRoute>.

const defaults = { title: '', description: '', category: 'other', status: 'lost', location: '' }

export default function ItemForm() {
  const nav = useNavigate()
  const { id } = useParams()
  const [form, setForm] = useState(defaults)
  const [error, setError] = useState('')

  // TODO (edit mode): when there is an `id`, load the item and fill the form.
  useEffect(() => {
  if (!id) return

  async function loadItem() {
    try {
      const response = await api.get(`/items/${id}`)

      const item = response.data.item

      setForm({
        title: item.title,
        status: item.status,
        category: item.category,
        location: item.location || '',
        description: item.description || ''
      })

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load item')
    }
  }

  loadItem()
}, [id])

  // TODO: update `form` when an input changes.
  function onChange(e) {
    // TODO
     const { name, value } = e.target;

  setForm({
    ...form,
    [name]: value
  });
  }

  // TODO: POST a new item, or PATCH the existing one when editing,
  // then go back to /items. Show the server's error message on failure.
  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    // TODO
    try {
    if (id) {
      await api.patch(`/items/${id}`, form)
    } else {
      await api.post('/items', form)
    }

    nav('/items')
  } catch (err) {
    setError(err.response?.data?.message || 'Something went wrong')
  }
  }

  return (
    <div className="max-w-lg mx-auto card">
      <h1 className="text-xl font-semibold mb-4">{id ? 'Edit' : 'Report'} Item</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <div>
  <label htmlFor="title">Title</label>

  <input
    id="title"
    name="title"
    type="text"
    value={form.title}
    onChange={onChange}
    required
    className="input"
  />
  <div>
  <label htmlFor="status">Status</label>

  <select
    id="status"
    name="status"
    value={form.status}
    onChange={onChange}
    className="input"
  >
    <option value="lost">Lost</option>
    <option value="found">Found</option>
    <option value="claimed">Claimed</option>
  </select>
</div>
<div>
  <label htmlFor="category">Category</label>

  <select
    id="category"
    name="category"
    value={form.category}
    onChange={onChange}
    className="input"
  >
    <option value="electronics">Electronics</option>
    <option value="clothing">Clothing</option>
    <option value="documents">Documents</option>
    <option value="accessories">Accessories</option>
    <option value="other">Other</option>
  </select>
</div>
<div>
  <label htmlFor="location">Location</label>

  <input
    id="location"
    name="location"
    type="text"
    value={form.location}
    onChange={onChange}
    

    className="input"
  />
</div>
<div>
  <label htmlFor="description">Description</label>

  <textarea
    id="description"
    name="description"
    value={form.description}
    onChange={onChange}
    
    className="input"
    rows={4}
  />
</div>
</div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button className="btn" type="submit">Save</button>
      </form>
    </div>
  )
}
