import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface OrderItemInput {
  menu_item_id: string
  item_name: string
  quantity: number
  unit_price: number
}

interface OrderBody {
  customer_name: string
  phone: string
  email: string
  address: string
  zip: string
  city: string
  delivery_time?: string | null
  num_guests?: number | null
  payment_method: 'efectivo' | 'tarjeta'
  notes?: string | null
  items: OrderItemInput[]
}

const NOTIFY_RECIPIENTS = ['neepurna@gmail.com', 'kinzora624@gmail.com']
const EMAIL_FROM = process.env.ORDER_EMAIL_FROM || 'Kinzora Pedidos <onboarding@resend.dev>'

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function buildEmail(payload: {
  orderNumber: string
  body: OrderBody
  subtotal: number
  total: number
}) {
  const { orderNumber, body, total } = payload
  const itemRows = body.items
    .map(
      (i) => `
      <tr>
        <td style="padding:8px 0;border-bottom:1px solid #1f1f1f;">${escapeHtml(i.item_name)}</td>
        <td style="padding:8px 0;border-bottom:1px solid #1f1f1f;text-align:center;">${i.quantity}</td>
        <td style="padding:8px 0;border-bottom:1px solid #1f1f1f;text-align:right;">${(i.unit_price * i.quantity).toFixed(2)}€</td>
      </tr>`
    )
    .join('')

  return `<!doctype html>
<html><body style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;background:#0a0a0a;color:#f8f4ee;margin:0;padding:24px;">
  <div style="max-width:560px;margin:0 auto;background:#111;border:1px solid #2a2a2a;border-radius:16px;padding:24px;">
    <h1 style="color:#c89b52;font-size:20px;margin:0 0 4px;">Nuevo pedido ${escapeHtml(orderNumber)}</h1>
    <p style="color:#888;font-size:13px;margin:0 0 20px;">Recibido en kinzora-sushi.com</p>

    <h2 style="color:#c89b52;font-size:14px;text-transform:uppercase;letter-spacing:1px;margin:16px 0 8px;">Cliente</h2>
    <table style="width:100%;font-size:14px;">
      <tr><td style="color:#888;padding:4px 0;width:120px;">Nombre</td><td>${escapeHtml(body.customer_name)}</td></tr>
      <tr><td style="color:#888;padding:4px 0;">Teléfono</td><td><a href="tel:${escapeHtml(body.phone)}" style="color:#c89b52;">${escapeHtml(body.phone)}</a></td></tr>
      <tr><td style="color:#888;padding:4px 0;">Email</td><td>${escapeHtml(body.email)}</td></tr>
    </table>

    <h2 style="color:#c89b52;font-size:14px;text-transform:uppercase;letter-spacing:1px;margin:20px 0 8px;">Entrega</h2>
    <table style="width:100%;font-size:14px;">
      <tr><td style="color:#888;padding:4px 0;width:120px;">Dirección</td><td>${escapeHtml(body.address)}</td></tr>
      <tr><td style="color:#888;padding:4px 0;">Código postal</td><td>${escapeHtml(body.zip)}</td></tr>
      <tr><td style="color:#888;padding:4px 0;">Ciudad</td><td>${escapeHtml(body.city)}</td></tr>
      ${body.delivery_time ? `<tr><td style="color:#888;padding:4px 0;">Hora entrega</td><td>${escapeHtml(body.delivery_time)}</td></tr>` : ''}
      ${body.num_guests ? `<tr><td style="color:#888;padding:4px 0;">Comensales</td><td>${body.num_guests}</td></tr>` : ''}
      <tr><td style="color:#888;padding:4px 0;">Pago</td><td>${body.payment_method === 'efectivo' ? 'Efectivo' : 'Tarjeta'}</td></tr>
    </table>

    ${body.notes ? `<h2 style="color:#c89b52;font-size:14px;text-transform:uppercase;letter-spacing:1px;margin:20px 0 8px;">Notas</h2><p style="font-size:14px;margin:0 0 16px;white-space:pre-wrap;">${escapeHtml(body.notes)}</p>` : ''}

    <h2 style="color:#c89b52;font-size:14px;text-transform:uppercase;letter-spacing:1px;margin:20px 0 8px;">Artículos</h2>
    <table style="width:100%;font-size:14px;border-collapse:collapse;">
      <thead>
        <tr style="color:#888;">
          <th style="text-align:left;padding:8px 0;border-bottom:1px solid #2a2a2a;font-weight:500;">Artículo</th>
          <th style="text-align:center;padding:8px 0;border-bottom:1px solid #2a2a2a;font-weight:500;width:48px;">Cant.</th>
          <th style="text-align:right;padding:8px 0;border-bottom:1px solid #2a2a2a;font-weight:500;width:80px;">Precio</th>
        </tr>
      </thead>
      <tbody>${itemRows}</tbody>
    </table>

    <div style="display:flex;justify-content:space-between;align-items:center;margin-top:16px;padding-top:16px;border-top:2px solid #c89b52;">
      <span style="font-size:14px;color:#888;">Total</span>
      <span style="font-size:20px;color:#c89b52;font-weight:700;">${total.toFixed(2)}€</span>
    </div>
  </div>
</body></html>`
}

export async function POST(request: Request) {
  const body = (await request.json()) as OrderBody

  if (
    !body.customer_name?.trim() ||
    !body.phone?.trim() ||
    !body.email?.trim() ||
    !body.address?.trim() ||
    !body.zip?.trim() ||
    !body.city?.trim() ||
    !body.payment_method
  ) {
    return Response.json({ error: 'Faltan campos obligatorios' }, { status: 400 })
  }

  if (!['efectivo', 'tarjeta'].includes(body.payment_method)) {
    return Response.json({ error: 'Forma de pago no válida' }, { status: 400 })
  }

  if (!body.items?.length) {
    return Response.json({ error: 'El pedido debe tener al menos un artículo' }, { status: 400 })
  }

  const subtotal = body.items.reduce((sum, i) => sum + i.unit_price * i.quantity, 0)
  const total = subtotal

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      customer_name: body.customer_name.trim(),
      phone: body.phone.trim(),
      email: body.email.trim(),
      order_type: 'delivery',
      address: body.address.trim(),
      zip: body.zip.trim(),
      city: body.city.trim(),
      delivery_time: body.delivery_time?.trim() || null,
      num_guests: body.num_guests ?? null,
      payment_method: body.payment_method,
      notes: body.notes?.trim() || null,
      subtotal,
      total,
      status: 'pending',
    })
    .select('id, order_number')
    .single()

  if (orderError) {
    console.error('order insert error', orderError)
    return Response.json({ error: 'Error al crear pedido' }, { status: 500 })
  }

  const orderItems = body.items.map((i) => ({
    order_id: order.id,
    menu_item_id: i.menu_item_id,
    item_name: i.item_name,
    quantity: i.quantity,
    unit_price: i.unit_price,
    total_price: i.unit_price * i.quantity,
  }))

  const { error: itemsError } = await supabase.from('order_items').insert(orderItems)

  if (itemsError) {
    console.error('order_items insert error', itemsError)
    return Response.json({ error: 'Error al guardar artículos del pedido' }, { status: 500 })
  }

  let emailStatus: 'sent' | 'skipped_no_key' | 'failed' = 'skipped_no_key'
  let emailError: string | null = null

  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY)
      const result = await resend.emails.send({
        from: EMAIL_FROM,
        to: NOTIFY_RECIPIENTS,
        replyTo: body.email.trim(),
        subject: `Nuevo pedido ${order.order_number} — ${total.toFixed(2)}€`,
        html: buildEmail({ orderNumber: order.order_number, body, subtotal, total }),
      })
      if (result.error) {
        emailStatus = 'failed'
        emailError = result.error.message || JSON.stringify(result.error)
        console.error('order email rejected by Resend', result.error)
      } else {
        emailStatus = 'sent'
      }
    } catch (e) {
      emailStatus = 'failed'
      emailError = e instanceof Error ? e.message : String(e)
      console.error('order email send threw', e)
    }
  } else {
    console.warn('RESEND_API_KEY not set; skipping order email')
  }

  return Response.json({
    success: true,
    orderId: order.id,
    orderNumber: order.order_number,
    emailStatus,
    emailError,
  })
}
