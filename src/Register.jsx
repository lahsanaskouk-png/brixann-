import { useState } from 'react'
import { supabase } from './supabase'

export default function Register() {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const register = async () => {
    if (!phone || !password) {
      alert('عمر النمرة وكلمة السر')
      return
    }

    // نحولو النمرة لإيميل
    const fakeEmail = `${phone}@brixa.app`

    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email: fakeEmail,
      password
    })

    setLoading(false)

    if (error) {
      alert(error.message)
    } else {
      alert('تم التسجيل بنجاح ✅')
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f0f0f',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#fff'
    }}>
      <div style={{
        background: '#1a1a1a',
        padding: 30,
        borderRadius: 10,
        width: 300
      }}>
        <h2 style={{ textAlign: 'center' }}>Register</h2>

        <input
          placeholder="رقم الهاتف"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ width: '100%', marginBottom: 10 }}
        />

        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', marginBottom: 20 }}
        />

        <button
          onClick={register}
          disabled={loading}
          style={{
            width: '100%',
            padding: 10,
            background: '#22c55e',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          {loading ? '...' : 'تسجيل'}
        </button>
      </div>
    </div>
  )
}
