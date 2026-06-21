import { Resend } from 'resend'

export async function GET() {
  const hasKey = Boolean(process.env.RESEND_API_KEY)
  const from = process.env.ORDER_EMAIL_FROM || 'Kinzora Pedidos <onboarding@resend.dev>'

  if (!hasKey) {
    return Response.json({
      ok: false,
      hasKey,
      from,
      reason: 'RESEND_API_KEY missing in process.env at runtime',
    })
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const result = await resend.emails.send({
      from,
      to: ['neepurna@gmail.com', 'kinzora694@gmail.com'],
      subject: 'Kinzora email test',
      html: '<p>If you see this, Resend wiring is correct.</p>',
    })
    return Response.json({ ok: !result.error, hasKey, from, result })
  } catch (e) {
    return Response.json({
      ok: false,
      hasKey,
      from,
      error: e instanceof Error ? { message: e.message, name: e.name } : String(e),
    })
  }
}
