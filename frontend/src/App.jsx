import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// const SERVER = "http://localhost:5005";
const SERVER = import.meta.env.VITE_API_URL || "";
const AUTH_API = `${SERVER}/api/auth`;
const PRODUCT_API = `${SERVER}/api/products`;
const ORDER_API = `${SERVER}/api/orders`;
const CART_API = `${SERVER}/api/cart`;
const WISHLIST_API = `${SERVER}/api/wishlist`;
const PAYMENT_API = `${SERVER}/api/payment`;
const ANALYTICS_API = `${SERVER}/api/analytics`;

const GENDERS = ["Men", "Women", "Kids"];
const CATEGORIES = [
  "Tops & Upper Body", "Bottoms & Lower Body", "One-Piece Garments", "Activewear & Sportswear",
  "Outerwear & Cold Weather", "Sleepwear & Undergarments", "Ethnic & Traditional", "Formal & Evening Wear",
];
const CATEGORY_ICONS = {
  "Tops & Upper Body": "👕", "Bottoms & Lower Body": "👖", "One-Piece Garments": "👗", "Activewear & Sportswear": "🏃",
  "Outerwear & Cold Weather": "🧥", "Sleepwear & Undergarments": "🩲", "Ethnic & Traditional": "🥻", "Formal & Evening Wear": "🤵",
};
const TRACK_STEPS = ["Placed", "Shipped", "Out for Delivery", "Delivered"];
const COLORS = ["#7c5cff", "#ff5c9e", "#2e8b57", "#c0392b", "#f1c40f"];

const emptyRegister = { name: "", email: "", password: "" };
const emptyOtp = { email: "", otp: "" };
const emptyLogin = { email: "", password: "" };
const emptyProduct = { name: "", description: "", price: "", category: CATEGORIES[0], gender: GENDERS[0], brand: "", stock: "" };
const emptyAddress = { fullName: "", phone: "", address: "" };
const emptyFilters = { status: "", customer: "", from: "", to: "" };

const inputStyle = { width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #333", background: "#1a1a1a", color: "#f0f0f0", fontSize: 14, outline: "none", boxSizing: "border-box", marginBottom: 14 };

const loadRazorpay = () => new Promise((resolve) => {
  if (window.Razorpay) return resolve(true);
  const s = document.createElement("script");
  s.src = "https://checkout.razorpay.com/v1/checkout.js";
  s.onload = () => resolve(true);
  s.onerror = () => resolve(false);
  document.body.appendChild(s);
});

function Toast({ message, type, onClose }) {
  if (!message) return null;
  return (
    <div onClick={onClose} style={{ position: "fixed", top: 70, right: 20, zIndex: 200, background: type === "error" ? "#3a1414" : "#123324", border: `1px solid ${type === "error" ? "#8a3a3a" : "#2e8b57"}`, color: type === "error" ? "#ff8f8f" : "#7de3a4", padding: "12px 18px", borderRadius: 8, fontSize: 14, cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.4)", maxWidth: 320 }}>
      {message}
    </div>
  );
}

function Field({ label, ...props }) {
  return <div style={{ textAlign: "left" }}><label style={{ display: "block", fontSize: 13, color: "#9a9a9a", marginBottom: 6 }}>{label}</label><input {...props} style={inputStyle} /></div>;
}
function Select({ label, options, ...props }) {
  return <div style={{ textAlign: "left" }}><label style={{ display: "block", fontSize: 13, color: "#9a9a9a", marginBottom: 6 }}>{label}</label><select {...props} style={inputStyle}>{options.map((o) => <option key={o} value={o}>{o}</option>)}</select></div>;
}
function Button({ children, loading, variant, ...props }) {
  const bg = variant === "danger" ? "#c0392b" : variant === "ghost" ? "transparent" : variant === "buy" ? "#ff5c9e" : loading ? "#5a4bb0" : "#7c5cff";
  return <button {...props} disabled={loading || props.disabled} style={{ padding: "10px 16px", borderRadius: 8, border: variant === "ghost" ? "1px solid #333" : "none", background: bg, color: "#fff", fontSize: 14, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", ...props.style }}>{loading ? "Please wait..." : children}</button>;
}
function BackButton({ onClick }) {
  return <button type="button" onClick={onClick} style={{ position: "absolute", top: 18, left: 18, width: 32, height: 32, borderRadius: 8, border: "1px solid #2a2a2a", background: "#161616", color: "#bbb", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>←</button>;
}
function Card({ children, wide }) {
  return <div style={{ position: "relative", background: "#121212", border: "1px solid #262626", borderRadius: 16, padding: "32px 24px", width: wide ? 900 : 380, maxWidth: "94vw", boxShadow: "0 8px 30px rgba(0,0,0,0.5)" }}>{children}</div>;
}
function ProductImage({ images, image, style }) {
  const src = image ? `${SERVER}${image}` : images && images[0] ? `${SERVER}${images[0]}` : null;
  return src ? <img src={src} alt="" style={{ width: "100%", objectFit: "cover", borderRadius: 10, ...style }} /> : <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#1a1a1a", borderRadius: 10, fontSize: 40, color: "#444", ...style }}>🖼️</div>;
}
function Stars({ rating }) {
  return <span style={{ color: "#ffb400", fontSize: 13 }}>{"★".repeat(Math.round(rating || 0))}{"☆".repeat(5 - Math.round(rating || 0))}</span>;
}
function StatCard({ label, value }) {
  return <div style={{ background: "#161616", border: "1px solid #262626", borderRadius: 10, padding: 16, textAlign: "center" }}>
    <p style={{ color: "#888", fontSize: 12, margin: "0 0 6px" }}>{label}</p>
    <p style={{ color: "#7c5cff", fontWeight: 700, fontSize: 22, margin: 0 }}>{value}</p>
  </div>;
}

function Navbar({ user, isAdmin, search, setSearch, cartCount, wishlistCount, onCartClick, onWishlistClick, onLogout, onHome, onOrders, onAdminOrders, onAnalytics, onLoginClick }) {
  return (
    <>
      <style>{`
        @media (max-width: 480px) {
          .navbar-brand-text { display: none; }
          .navbar-row { gap: 8px !important; padding: 10px 10px !important; }
          .navbar-right { gap: 8px !important; }
          .navbar-login-btn { padding: 8px 10px !important; font-size: 12px !important; }
        }
      `}</style>
      <div className="navbar-row" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, display: "flex", flexWrap: "nowrap", alignItems: "center", gap: 14, background: "#161616", borderBottom: "1px solid #262626", padding: "12px 20px", boxSizing: "border-box" }}>
        <h2 onClick={onHome} style={{ color: "#7c5cff", margin: 0, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0, fontSize: 18 }}>🛍️<span className="navbar-brand-text"> ShopNest</span></h2>
        <input placeholder="Search for products..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ ...inputStyle, marginBottom: 0, flex: "1 1 60px", minWidth: 0, maxWidth: 480 }} />
        <div className="navbar-right" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", gap: 14, marginLeft: "auto", flexShrink: 0 }}>
          {user ? (
            <>
              {isAdmin && <span onClick={onAnalytics} style={{ color: "#aaa", fontSize: 13, cursor: "pointer", whiteSpace: "nowrap" }}>📊 Analytics</span>}
              {isAdmin && <span onClick={onAdminOrders} style={{ color: "#aaa", fontSize: 13, cursor: "pointer", whiteSpace: "nowrap" }}>🗂 All Orders</span>}
              <span onClick={onOrders} style={{ color: "#aaa", fontSize: 13, cursor: "pointer", whiteSpace: "nowrap" }}>📦 My Orders</span>
              <span onClick={onWishlistClick} style={{ position: "relative", color: "#aaa", fontSize: 20, cursor: "pointer" }}>
                ❤️{wishlistCount > 0 && <span style={{ position: "absolute", top: -6, right: -10, background: "#ff5c9e", color: "#fff", borderRadius: "50%", fontSize: 11, width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>{wishlistCount}</span>}
              </span>
              <span style={{ color: "#aaa", fontSize: 13, whiteSpace: "nowrap" }}>{user?.name} • {isAdmin ? "Admin" : "Customer"}</span>
              <button onClick={onCartClick} style={{ position: "relative", background: "transparent", border: "none", color: "#f0f0f0", fontSize: 22, cursor: "pointer" }}>
                🛒{cartCount > 0 && <span style={{ position: "absolute", top: -6, right: -10, background: "#ff5c9e", color: "#fff", borderRadius: "50%", fontSize: 11, width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>{cartCount}</span>}
              </button>
              <Button variant="ghost" onClick={onLogout}>Logout</Button>
            </>
          ) : (
            <>
              <span onClick={onWishlistClick} style={{ position: "relative", color: "#aaa", fontSize: 20, cursor: "pointer" }}>🤍</span>
              <button onClick={onCartClick} style={{ position: "relative", background: "transparent", border: "none", color: "#f0f0f0", fontSize: 22, cursor: "pointer" }}>🛒</button>
              <Button className="navbar-login-btn" onClick={onLoginClick} style={{ whiteSpace: "nowrap" }}>Login / Signup</Button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

function CategoryBar({ category, onPick }) {
  const item = (active, icon, label, onClick) => (
    <div onClick={onClick} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "6px 14px", cursor: "pointer", flexShrink: 0, userSelect: "none" }}>
      <span style={{ fontSize: 26 }}>{icon}</span>
      <span style={{ fontSize: 13, fontWeight: 600, color: active ? "#f0f0f0" : "#999", whiteSpace: "nowrap" }}>{label}</span>
      <div style={{ height: 3, width: 26, borderRadius: 2, background: active ? "#7c5cff" : "transparent" }} />
    </div>
  );
  return (
    <>
      <style>{`.cat-scroll::-webkit-scrollbar{display:none}`}</style>
      <div className="cat-scroll" style={{ position: "fixed", top: 64, left: 0, right: 0, zIndex: 49, display: "flex", overflowX: "auto", scrollbarWidth: "none", msOverflowStyle: "none", background: "#161616", borderBottom: "1px solid #262626", padding: "6px 20px", boxSizing: "border-box" }}>
        {item(!category, "🛍️", "For You", () => onPick(""))}
        {CATEGORIES.map((c) => item(category === c, CATEGORY_ICONS[c], c.split(" ")[0], () => onPick(c)))}
      </div>
    </>
  );
}

function ProductCard({ p, isAdmin, wishlisted, onView, onEdit, onDelete, onToggleWishlist }) {
  return (
    <div style={{ background: "#161616", border: "1px solid #262626", borderRadius: 12, padding: 14 }}>
      <div onClick={() => onView(p)} style={{ cursor: "pointer" }}>
        <div style={{ position: "relative" }}>
          <ProductImage images={p.images} style={{ height: 140, marginBottom: 10 }} />
          <span onClick={(e) => { e.stopPropagation(); onToggleWishlist(p); }} style={{ position: "absolute", top: 6, right: 6, fontSize: 18, cursor: "pointer" }}>{wishlisted ? "❤️" : "🤍"}</span>
        </div>
        <h3 style={{ margin: "0 0 4px", color: "#f0f0f0", fontSize: 16 }}>{p.name}</h3>
        <p style={{ margin: "0 0 4px", color: "#888", fontSize: 13 }}>{p.gender} • {p.category}</p>
        {p.numReviews > 0 && <p style={{ margin: "0 0 6px" }}><Stars rating={p.avgRating} /> <span style={{ color: "#777", fontSize: 12 }}>({p.numReviews})</span></p>}
        <p style={{ margin: "0 0 12px", color: "#7c5cff", fontWeight: 700, fontSize: 17 }}>₹{p.price}</p>
      </div>
      {isAdmin && (
        <div style={{ display: "flex", gap: 8 }}>
          <Button variant="ghost" style={{ flex: 1, padding: "6px 0" }} onClick={() => onEdit(p)}>Edit</Button>
          <Button variant="danger" style={{ flex: 1, padding: "6px 0" }} onClick={() => onDelete(p._id)}>Delete</Button>
        </div>
      )}
    </div>
  );
}

function ProductDetail({ p, wishlisted, onBack, onAddToCart, onBuyNow, onToggleWishlist, reviewForm, setReviewForm, onSubmitReview }) {
  return (
    <Card wide>
      <BackButton onClick={onBack} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 28, marginTop: 20 }}>
        <ProductImage images={p.images} style={{ height: 320 }} />
        <div style={{ textAlign: "left" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2 style={{ color: "#f0f0f0", margin: "0 0 8px" }}>{p.name}</h2>
            <span onClick={() => onToggleWishlist(p)} style={{ fontSize: 24, cursor: "pointer" }}>{wishlisted ? "❤️" : "🤍"}</span>
          </div>
          <p style={{ color: "#888", fontSize: 13, margin: "0 0 4px" }}>{p.gender} • {p.category}</p>
          {p.numReviews > 0 && <p style={{ margin: "0 0 8px" }}><Stars rating={p.avgRating} /> <span style={{ color: "#777", fontSize: 12 }}>({p.numReviews} reviews)</span></p>}
          <p style={{ color: "#888", fontSize: 13, margin: "0 0 16px" }}>Stock: {p.stock} available</p>
          <p style={{ color: "#7c5cff", fontWeight: 700, fontSize: 26, margin: "0 0 16px" }}>₹{p.price}</p>
          <p style={{ color: "#ccc", fontSize: 14, lineHeight: 1.6, margin: "0 0 24px" }}>{p.description}</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Button variant="ghost" style={{ flex: "1 1 140px" }} onClick={() => onAddToCart(p)}>🛒 Add to Cart</Button>
            <Button variant="buy" style={{ flex: "1 1 140px" }} onClick={() => onBuyNow([{ product: p._id, name: p.name, price: p.price, image: p.images?.[0], quantity: 1 }])}>Buy Now</Button>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 28, textAlign: "left" }}>
        <h3 style={{ color: "#f0f0f0" }}>Reviews</h3>
        {p.reviews?.length ? p.reviews.map((r, i) => (
          <div key={i} style={{ borderBottom: "1px solid #262626", padding: "8px 0" }}>
            <p style={{ margin: 0, color: "#f0f0f0", fontWeight: 600 }}>{r.name} <Stars rating={r.rating} /></p>
            <p style={{ margin: "4px 0 0", color: "#aaa", fontSize: 13 }}>{r.comment}</p>
          </div>
        )) : <p style={{ color: "#888" }}>No reviews yet.</p>}

        <div style={{ display: "flex", gap: 12, marginTop: 16, flexWrap: "wrap" }}>
          <select value={reviewForm.rating} onChange={(e) => setReviewForm((r) => ({ ...r, rating: e.target.value }))} style={{ ...inputStyle, width: 100, marginBottom: 0 }}>
            {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} ★</option>)}
          </select>
          <input placeholder="Write a review..." value={reviewForm.comment} onChange={(e) => setReviewForm((r) => ({ ...r, comment: e.target.value }))} style={{ ...inputStyle, flex: "1 1 200px", marginBottom: 0 }} />
          <Button onClick={onSubmitReview}>Submit</Button>
        </div>
      </div>
    </Card>
  );
}

function CartPage({ cart, onBack, onQty, onRemove, onBuyNow }) {
  const total = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);
  return (
    <Card wide>
      <BackButton onClick={onBack} />
      <h2 style={{ color: "#f0f0f0", marginTop: 20 }}>Your Cart ({cart.length})</h2>
      {cart.length === 0 ? <p style={{ color: "#888" }}>Cart is empty.</p> : (
        <>
          {cart.map((p) => (
            <div key={p.product} style={{ display: "flex", gap: 14, alignItems: "center", background: "#161616", border: "1px solid #262626", borderRadius: 10, padding: 12, marginBottom: 10, flexWrap: "wrap" }}>
              <ProductImage image={p.image} style={{ width: 70, height: 70 }} />
              <div style={{ flex: "1 1 140px", textAlign: "left" }}>
                <p style={{ color: "#f0f0f0", margin: "0 0 4px", fontWeight: 600 }}>{p.name}</p>
                <p style={{ color: "#7c5cff", margin: 0, fontWeight: 700 }}>₹{p.price}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Button variant="ghost" style={{ padding: "4px 10px" }} onClick={() => onQty(p.product, p.quantity - 1)}>−</Button>
                <span style={{ color: "#f0f0f0" }}>{p.quantity}</span>
                <Button variant="ghost" style={{ padding: "4px 10px" }} onClick={() => onQty(p.product, p.quantity + 1)}>+</Button>
              </div>
              <Button variant="danger" onClick={() => onRemove(p.product)}>Remove</Button>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16, flexWrap: "wrap", gap: 10 }}>
            <h3 style={{ color: "#f0f0f0" }}>Total: ₹{total}</h3>
            <Button variant="buy" onClick={() => onBuyNow(cart)}>Checkout</Button>
          </div>
        </>
      )}
    </Card>
  );
}

function WishlistPage({ wishlist, onBack, onView, onToggleWishlist }) {
  return (
    <Card wide>
      <BackButton onClick={onBack} />
      <h2 style={{ color: "#f0f0f0", marginTop: 20 }}>My Wishlist ({wishlist.length})</h2>
      {wishlist.length === 0 ? <p style={{ color: "#888" }}>No items in wishlist.</p> : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
          {wishlist.map((p) => <ProductCard key={p._id} p={p} isAdmin={false} wishlisted onView={onView} onToggleWishlist={onToggleWishlist} />)}
        </div>
      )}
    </Card>
  );
}

function PaymentPage({ items, onBack, onPay, loading }) {
  const [address, setAddress] = useState(emptyAddress);
  const [method, setMethod] = useState("upi");
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const change = (e) => setAddress((a) => ({ ...a, [e.target.name]: e.target.value }));
  const handlePay = (e) => { e.preventDefault(); if (!address.fullName || !address.phone || !address.address) return; onPay(items, address, method); };

  return (
    <Card wide>
      <BackButton onClick={onBack} />
      <h2 style={{ color: "#f0f0f0", marginTop: 20 }}>Checkout</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 28 }}>
        <form onSubmit={handlePay} style={{ textAlign: "left" }}>
          <h4 style={{ color: "#f0f0f0" }}>Shipping Address</h4>
          <Field label="Full name" name="fullName" value={address.fullName} onChange={change} />
          <Field label="Phone" name="phone" value={address.phone} onChange={change} />
          <Field label="Address" name="address" value={address.address} onChange={change} />
          <h4 style={{ color: "#f0f0f0" }}>Payment Method</h4>
          {["upi", "card", "cod"].map((m) => (
            <label key={m} style={{ display: "flex", alignItems: "center", gap: 8, color: "#ccc", fontSize: 14, marginBottom: 8, cursor: "pointer" }}>
              <input type="radio" name="method" checked={method === m} onChange={() => setMethod(m)} />
              {m === "upi" ? "UPI (Razorpay)" : m === "card" ? "Card (Razorpay)" : "Cash on Delivery"}
            </label>
          ))}
          <Button type="submit" variant="buy" loading={loading} style={{ width: "100%", marginTop: 12 }}>{method === "cod" ? `Place Order ₹${total}` : `Pay ₹${total}`}</Button>
          <p style={{ fontSize: 11, color: "#666", marginTop: 10 }}>UPI/Card uses Razorpay test mode — no real money is charged.</p>
        </form>
        <div>
          <h4 style={{ color: "#f0f0f0" }}>Order Summary</h4>
          {items.map((p, i) => <div key={i} style={{ display: "flex", justifyContent: "space-between", color: "#ccc", fontSize: 14, marginBottom: 8 }}><span>{p.name} x {p.quantity}</span><span>₹{p.price * p.quantity}</span></div>)}
          <hr style={{ borderColor: "#333" }} />
          <div style={{ display: "flex", justifyContent: "space-between", color: "#f0f0f0", fontWeight: 700, fontSize: 16 }}><span>Total</span><span>₹{total}</span></div>
        </div>
      </div>
    </Card>
  );
}

function OrderSuccessPage({ order, onContinue }) {
  return (
    <Card>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 10 }}>✅</div>
        <h2 style={{ color: "#f0f0f0", margin: "0 0 8px" }}>Order Placed!</h2>
        <p style={{ color: "#888", marginBottom: 4 }}>Order ID: {order?._id}</p>
        <p style={{ color: "#7c5cff", fontWeight: 700, fontSize: 20, marginBottom: 20 }}>₹{order?.totalAmount}</p>
        <Button onClick={onContinue} style={{ width: "100%" }}>Continue Shopping</Button>
      </div>
    </Card>
  );
}

function Tracker({ status }) {
  const idx = TRACK_STEPS.indexOf(status);
  return (
    <div style={{ display: "flex", alignItems: "center", margin: "14px 0" }}>
      {TRACK_STEPS.map((step, i) => (
        <React.Fragment key={step}>
          <div style={{ textAlign: "center", flex: 1 }}>
            <div style={{ width: 22, height: 22, borderRadius: "50%", margin: "0 auto 4px", background: i <= idx ? "#7c5cff" : "#333", color: "#fff", fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>{i <= idx ? "✓" : i + 1}</div>
            <span style={{ fontSize: 11, color: i <= idx ? "#f0f0f0" : "#666" }}>{step}</span>
          </div>
          {i < TRACK_STEPS.length - 1 && <div style={{ flex: 1, height: 2, background: i < idx ? "#7c5cff" : "#333", marginTop: -18 }} />}
        </React.Fragment>
      ))}
    </div>
  );
}

function OrdersPage({ orders, onBack }) {
  return (
    <Card wide>
      <BackButton onClick={onBack} />
      <h2 style={{ color: "#f0f0f0", marginTop: 20 }}>My Orders</h2>
      {orders.length === 0 ? <p style={{ color: "#888" }}>No orders yet.</p> : orders.map((o) => (
        <div key={o._id} style={{ background: "#161616", border: "1px solid #262626", borderRadius: 10, padding: 16, marginBottom: 14, textAlign: "left" }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 6 }}>
            <span style={{ color: "#f0f0f0", fontWeight: 600 }}>Order #{o._id.slice(-6)}</span>
            {o.estimatedDelivery && <span style={{ color: "#888", fontSize: 12 }}>Est. delivery: {new Date(o.estimatedDelivery).toLocaleDateString()}</span>}
          </div>
          {o.orderStatus !== "Cancelled" ? <Tracker status={o.orderStatus} /> : <p style={{ color: "#ff8f8f" }}>Order Cancelled</p>}
          {o.items.map((it, i) => <p key={i} style={{ color: "#ccc", fontSize: 13, margin: "2px 0" }}>{it.name} x {it.quantity} — ₹{it.price * it.quantity}</p>)}
          <p style={{ color: "#7c5cff", fontWeight: 700, marginTop: 6 }}>Total: ₹{o.totalAmount}</p>
        </div>
      ))}
    </Card>
  );
}

function AdminOrdersPage({ orders, filters, setFilters, onApply, onBack, onStatusChange }) {
  return (
    <Card wide>
      <BackButton onClick={onBack} />
      <h2 style={{ color: "#f0f0f0", marginTop: 20 }}>All Orders (Admin)</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
        <select value={filters.status} onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))} style={{ ...inputStyle, width: "auto", marginBottom: 0 }}>
          <option value="">All Status</option>
          {[...TRACK_STEPS, "Cancelled"].map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <input placeholder="Search customer name/email" value={filters.customer} onChange={(e) => setFilters((f) => ({ ...f, customer: e.target.value }))} style={{ ...inputStyle, width: 220, marginBottom: 0 }} />
        <input type="date" value={filters.from} onChange={(e) => setFilters((f) => ({ ...f, from: e.target.value }))} style={{ ...inputStyle, width: "auto", marginBottom: 0 }} />
        <input type="date" value={filters.to} onChange={(e) => setFilters((f) => ({ ...f, to: e.target.value }))} style={{ ...inputStyle, width: "auto", marginBottom: 0 }} />
        <Button onClick={onApply}>Apply</Button>
      </div>
      {orders.length === 0 ? <p style={{ color: "#888" }}>No orders found.</p> : orders.map((o) => (
        <div key={o._id} style={{ background: "#161616", border: "1px solid #262626", borderRadius: 10, padding: 16, marginBottom: 14, textAlign: "left" }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <span style={{ color: "#f0f0f0", fontWeight: 600 }}>Order #{o._id.slice(-6)}</span>
            <select value={o.orderStatus} onChange={(e) => onStatusChange(o._id, e.target.value)} style={{ ...inputStyle, width: "auto", marginBottom: 0, padding: "4px 8px" }}>
              {[...TRACK_STEPS, "Cancelled"].map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <p style={{ color: "#888", fontSize: 13, margin: "6px 0" }}>Customer: {o.user?.name} ({o.user?.email})</p>
          {o.items.map((it, i) => <p key={i} style={{ color: "#ccc", fontSize: 13, margin: "2px 0" }}>{it.name} x {it.quantity} — ₹{it.price * it.quantity}</p>)}
          <p style={{ color: "#7c5cff", fontWeight: 700, marginTop: 6 }}>Total: ₹{o.totalAmount}</p>
        </div>
      ))}
    </Card>
  );
}

function AnalyticsPage({ stats, onBack }) {
  if (!stats) return <Card wide><BackButton onClick={onBack} /><p style={{ color: "#888", marginTop: 20 }}>Loading...</p></Card>;
  return (
    <Card wide>
      <BackButton onClick={onBack} />
      <h2 style={{ color: "#f0f0f0", marginTop: 20 }}>Analytics</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: 24 }}>
        <StatCard label="Total Sales" value={`₹${stats.totalSales}`} />
        <StatCard label="Total Orders" value={stats.totalOrders} />
        <StatCard label="Total Products" value={stats.totalProducts} />
        <StatCard label="Low Stock Items" value={stats.lowStockProducts?.length || 0} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
        <div>
          <h4 style={{ color: "#f0f0f0" }}>Sales (Last 7 Days)</h4>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={stats.salesByDay}>
              <XAxis dataKey="day" tick={{ fill: "#888", fontSize: 10 }} />
              <YAxis tick={{ fill: "#888", fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="total" fill="#7c5cff" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h4 style={{ color: "#f0f0f0" }}>Orders by Status</h4>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={stats.ordersByStatus} dataKey="count" nameKey="status" outerRadius={80} label>
                {stats.ordersByStatus?.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <h4 style={{ color: "#f0f0f0", marginTop: 24 }}>Low Stock Products (≤ 5 left)</h4>
      {stats.lowStockProducts?.length ? stats.lowStockProducts.map((p) => <p key={p._id} style={{ color: "#ff8f8f", fontSize: 13 }}>{p.name} — only {p.stock} left</p>) : <p style={{ color: "#888" }}>All products well stocked.</p>}
    </Card>
  );
}

function Footer() {
  const col = (title, items) => (
    <div>
      <h5 style={{ color: "#888", fontSize: 13, fontWeight: 600, margin: "0 0 14px", letterSpacing: 0.5 }}>{title}</h5>
      {items.map((it) => <p key={it} style={{ color: "#ccc", fontSize: 13, margin: "0 0 10px", cursor: "pointer" }}>{it}</p>)}
    </div>
  );
  return (
    <div style={{ background: "#0a0a0a", borderTop: "1px solid #262626", padding: "36px 24px 20px", marginTop: 30 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 24, maxWidth: 1200, margin: "0 auto" }}>
        {col("ABOUT", ["Contact Us", "About Us", "Careers", "Press"])}
        {col("HELP", ["Payments", "Shipping", "Returns", "FAQ"])}
        {col("CONSUMER POLICY", ["Cancellation & Returns", "Terms Of Use", "Privacy", "Grievance Redressal"])}
        <div>
          <h5 style={{ color: "#888", fontSize: 13, fontWeight: 600, margin: "0 0 14px", letterSpacing: 0.5 }}>MAIL US</h5>
          <p style={{ color: "#ccc", fontSize: 13, lineHeight: 1.7, margin: "0 0 16px" }}>ShopNest Internet Pvt. Ltd,<br />Tech Park, Outer Ring Road,<br />Bengaluru, Karnataka, India</p>
          <h5 style={{ color: "#888", fontSize: 13, fontWeight: 600, margin: "0 0 10px", letterSpacing: 0.5 }}>SOCIAL</h5>
          <div style={{ display: "flex", gap: 12, fontSize: 18 }}><span style={{ cursor: "pointer" }}>📘</span><span style={{ cursor: "pointer" }}>🐦</span><span style={{ cursor: "pointer" }}>▶️</span><span style={{ cursor: "pointer" }}>📸</span></div>
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 12, maxWidth: 1200, margin: "28px auto 0", paddingTop: 18, borderTop: "1px solid #1e1e1e" }}>
        <span style={{ color: "#777", fontSize: 12 }}>© 2020-2026 ShopNest.com</span>
        <span style={{ color: "#777", fontSize: 20 }}>💳 🏦 📱 💰</span>
      </div>
    </div>
  );
}

export default function App() {
  // guest can browse; page starts on the shop, not on auth
  const [page, setPage] = useState("dashboard");
  const [registerForm, setRegisterForm] = useState(emptyRegister);
  const [otpForm, setOtpForm] = useState(emptyOtp);
  const [loginForm, setLoginForm] = useState(emptyLogin);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "" });
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [pendingAction, setPendingAction] = useState(null); // resumed automatically once login succeeds

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [lastOrder, setLastOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [orderFilters, setOrderFilters] = useState(emptyFilters);
  const [stats, setStats] = useState(null);
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");
  const [category, setCategory] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [productForm, setProductForm] = useState(emptyProduct);
  const [imageFiles, setImageFiles] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });

  const isAdmin = user?.role === "admin";
  const authPage = ["register", "verify-otp", "login"].includes(page);

  const showToast = (message, type = "success") => { setToast({ message, type }); setTimeout(() => setToast({ message: "", type: "" }), 3500); };
  const onChange = (setter) => (e) => setter((p) => ({ ...p, [e.target.name]: e.target.value }));

  // any action that needs login calls this instead of running directly
  const requireLogin = (action) => { setPendingAction(() => action); setPage("login"); showToast("Please login to continue", "error"); };

  // once token is set (right after login), automatically resume whatever the guest was trying to do
  useEffect(() => {
    if (token && pendingAction) { pendingAction(); setPendingAction(null); }
  }, [token, pendingAction]);

  const apiJSON = async (base, endpoint, body, method = "POST", auth = false) => {
    const res = await fetch(`${base}${endpoint}`, { method, headers: { "Content-Type": "application/json", ...(auth ? { Authorization: `Bearer ${token}` } : {}) }, body: body ? JSON.stringify(body) : undefined });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.message || "Something went wrong");
    return data;
  };
  const apiForm = async (endpoint, formData, method = "POST") => {
    const res = await fetch(`${PRODUCT_API}${endpoint}`, { method, headers: { Authorization: `Bearer ${token}` }, body: formData });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.message || "Something went wrong");
    return data;
  };

  // ---- Auth ----
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!registerForm.name || !registerForm.email || !registerForm.password) return showToast("Please fill all fields", "error");
    setLoading(true);
    try { const data = await apiJSON(AUTH_API, "/register", registerForm); showToast(data.message || "OTP sent"); setOtpForm({ email: registerForm.email, otp: "" }); setPage("verify-otp"); }
    catch (err) { showToast(err.message, "error"); } finally { setLoading(false); }
  };
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otpForm.email || !otpForm.otp) return showToast("Enter email and OTP", "error");
    setLoading(true);
    try { const data = await apiJSON(AUTH_API, "/verify-otp", otpForm); showToast(data.message || "Verified"); setLoginForm({ email: otpForm.email, password: "" }); setPage("login"); }
    catch (err) { showToast(err.message, "error"); } finally { setLoading(false); }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) return showToast("Enter email and password", "error");
    setLoading(true);
    try { const data = await apiJSON(AUTH_API, "/login", loginForm); showToast(data.message || "Login successful"); setUser(data.user); setToken(data.token); setPage("dashboard"); }
    catch (err) { showToast(err.message, "error"); } finally { setLoading(false); }
  };
  const handleResendOtp = async () => {
    if (!otpForm.email) return showToast("Enter your email first", "error");
    setLoading(true);
    try { const data = await apiJSON(AUTH_API, "/register", { ...registerForm, email: otpForm.email }); showToast(data.message || "New OTP sent"); }
    catch (err) { showToast(err.message, "error"); } finally { setLoading(false); }
  };
  const handleLogout = () => { setUser(null); setToken(null); setCart([]); setWishlist([]); setRegisterForm(emptyRegister); setOtpForm(emptyOtp); setLoginForm(emptyLogin); setPage("dashboard"); };
  // "back"/close on auth screens now returns to the shop, since guests can already browse
  const backFromOtp = () => setPage("dashboard");
  const backFromLogin = () => setPage("dashboard");
  const backFromRegister = () => setPage("dashboard");

  // ---- Products (public, no auth needed) ----
  const fetchProducts = async () => { try { const data = await apiJSON(PRODUCT_API, "/", null, "GET"); setProducts(data.products || []); } catch (err) { showToast(err.message, "error"); } };
  useEffect(() => { if (page === "dashboard") fetchProducts(); }, [page]);

  const openAddForm = () => { setProductForm(emptyProduct); setImageFiles([]); setEditingId(null); setShowForm(true); };
  const openEditForm = (p) => { setProductForm({ name: p.name, description: p.description, price: p.price, category: p.category, gender: p.gender, brand: p.brand || "", stock: p.stock }); setImageFiles([]); setEditingId(p._id); setShowForm(true); };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    const { name, description, price, category, gender } = productForm;
    if (!name || !description || !price || !category || !gender) return showToast("Please fill all fields", "error");
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(productForm).forEach(([k, v]) => fd.append(k, v));
      imageFiles.forEach((file) => fd.append("images", file));
      if (editingId) { await apiForm(`/${editingId}`, fd, "PUT"); showToast("Product updated"); }
      else { await apiForm("/", fd, "POST"); showToast("Product created"); }
      setShowForm(false); fetchProducts();
    } catch (err) { showToast(err.message, "error"); } finally { setLoading(false); }
  };
  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try { await apiJSON(PRODUCT_API, `/${id}`, null, "DELETE", true); showToast("Product deleted"); fetchProducts(); } catch (err) { showToast(err.message, "error"); }
  };
  const handleBulkUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("file", file);
    setLoading(true);
    try {
      const res = await fetch(`${PRODUCT_API}/bulk-upload`, { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed");
      showToast(data.message);
      fetchProducts();
    } catch (err) { showToast(err.message, "error"); } finally { setLoading(false); e.target.value = ""; }
  };

  const openProductDetail = (p) => { setSelectedProduct(p); setReviewForm({ rating: 5, comment: "" }); setPage("product-detail"); };
  const backToDashboard = () => { setSelectedProduct(null); setPage("dashboard"); };

  // ---- Cart (backend-persisted, requires login) ----
  const fetchCart = async () => { try { const data = await apiJSON(CART_API, "", null, "GET", true); setCart(data.items || []); } catch { } };
  useEffect(() => { if (token) fetchCart(); }, [token]);

  const handleAddToCart = async (p) => {
    if (!user) return requireLogin(() => handleAddToCart(p));
    try { const data = await apiJSON(CART_API, "", { productId: p._id, name: p.name, price: p.price, image: p.images?.[0], quantity: 1 }, "POST", true); setCart(data.items); showToast(`${p.name} added to cart`); }
    catch (err) { showToast(err.message, "error"); }
  };
  const handleQty = async (productId, quantity) => {
    try { const data = await apiJSON(CART_API, `/${productId}`, { quantity }, "PUT", true); setCart(data.items); } catch (err) { showToast(err.message, "error"); }
  };
  const handleRemoveFromCart = async (productId) => {
    try { const data = await apiJSON(CART_API, `/${productId}`, null, "DELETE", true); setCart(data.items); } catch (err) { showToast(err.message, "error"); }
  };
  const clearCartBackend = async () => { try { await apiJSON(CART_API, "", null, "DELETE", true); setCart([]); } catch { } };

  // ---- Wishlist (requires login) ----
  const fetchWishlist = async () => { try { const data = await apiJSON(WISHLIST_API, "", null, "GET", true); setWishlist(data.products || []); } catch { } };
  useEffect(() => { if (token) fetchWishlist(); }, [token]);
  const handleToggleWishlist = async (p) => {
    if (!user) return requireLogin(() => handleToggleWishlist(p));
    try { const data = await apiJSON(WISHLIST_API, "/toggle", { productId: p._id }, "POST", true); showToast(data.message); fetchWishlist(); } catch (err) { showToast(err.message, "error"); }
  };
  const isWishlisted = (id) => wishlist.some((p) => p._id === id);

  // ---- Reviews (requires login) ----
  const handleSubmitReview = async () => {
    if (!user) return requireLogin(() => handleSubmitReview());
    try { const data = await apiJSON(PRODUCT_API, `/${selectedProduct._id}/reviews`, reviewForm, "POST", true); showToast("Review added"); setSelectedProduct(data.product); setReviewForm({ rating: 5, comment: "" }); fetchProducts(); }
    catch (err) { showToast(err.message, "error"); }
  };

  // ---- Checkout / Payment / Orders (requires login) ----
  const goToPayment = (items) => {
    if (!user) return requireLogin(() => goToPayment(items));
    setCheckoutItems(items); setPage("payment");
  };

  const handlePay = async (items, shippingAddress, method) => {
    setLoading(true);
    try {
      const payload = { items: items.map((i) => ({ product: i.product, name: i.name, price: i.price, quantity: i.quantity })), shippingAddress };

      if (method === "cod") {
        const data = await apiJSON(ORDER_API, "", payload, "POST", true);
        setLastOrder(data.order); await clearCartBackend(); fetchProducts(); showToast("Order placed (COD)"); setPage("order-success");
        return;
      }

      const ok = await loadRazorpay();
      if (!ok) return showToast("Razorpay SDK failed to load", "error");
      const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
      const orderData = await apiJSON(PAYMENT_API, "/create-order", { amount: total }, "POST", true);

      const rzp = new window.Razorpay({
        key: orderData.key, amount: orderData.order.amount, currency: "INR", name: "ShopNest", order_id: orderData.order.id,
        handler: async (response) => {
          try {
            const data = await apiJSON(PAYMENT_API, "/verify", { ...response, ...payload }, "POST", true);
            setLastOrder(data.order); await clearCartBackend(); fetchProducts(); showToast("Payment successful!"); setPage("order-success");
          } catch (err) { showToast(err.message, "error"); }
        },
        prefill: { name: shippingAddress.fullName, contact: shippingAddress.phone },
        theme: { color: "#7c5cff" },
      });
      rzp.open();
    } catch (err) { showToast(err.message, "error"); } finally { setLoading(false); }
  };

  const fetchOrders = async () => { try { const data = await apiJSON(ORDER_API, "/my", null, "GET", true); setOrders(data.orders || []); } catch (err) { showToast(err.message, "error"); } };
  const openOrders = () => {
    if (!user) return requireLogin(() => openOrders());
    fetchOrders(); setPage("orders");
  };

  const fetchAllOrders = async () => {
    const params = new URLSearchParams(Object.fromEntries(Object.entries(orderFilters).filter(([, v]) => v)));
    try { const data = await apiJSON(ORDER_API, `?${params}`, null, "GET", true); setAllOrders(data.orders || []); } catch (err) { showToast(err.message, "error"); }
  };
  const openAdminOrders = () => { fetchAllOrders(); setPage("admin-orders"); };
  const handleStatusChange = async (id, orderStatus) => { try { await apiJSON(ORDER_API, `/${id}/status`, { orderStatus }, "PUT", true); showToast("Status updated"); fetchAllOrders(); } catch (err) { showToast(err.message, "error"); } };

  const fetchStats = async () => { try { const data = await apiJSON(ANALYTICS_API, "", null, "GET", true); setStats(data); } catch (err) { showToast(err.message, "error"); } };
  const openAnalytics = () => { fetchStats(); setPage("analytics"); };

  const filteredProducts = products.filter((p) => (!gender || p.gender === gender) && (!category || p.category === category) && p.name.toLowerCase().includes(search.toLowerCase()));

  if (authPage) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0a0a0a", fontFamily: "'Segoe UI', system-ui, sans-serif", padding: 16, boxSizing: "border-box" }}>
        <Toast {...toast} onClose={() => setToast({ message: "", type: "" })} />
        <Card>
          <BackButton onClick={page === "verify-otp" ? backFromOtp : page === "login" ? backFromLogin : backFromRegister} />
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 48, height: 48, borderRadius: 12, background: "linear-gradient(135deg, #7c5cff, #ff5c9e)", fontSize: 22, marginBottom: 10 }}>🛍️</div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "#f0f0f0", margin: 0 }}>ShopNest</h1>
          </div>

          {page === "register" && (
            <form onSubmit={handleRegister}>
              <Field label="Full name" name="name" value={registerForm.name} onChange={onChange(setRegisterForm)} />
              <Field label="Email" type="email" name="email" value={registerForm.email} onChange={onChange(setRegisterForm)} />
              <Field label="Password" type="password" name="password" value={registerForm.password} onChange={onChange(setRegisterForm)} />
              <Button type="submit" loading={loading} style={{ width: "100%" }}>Create account</Button>
              <p style={{ textAlign: "center", fontSize: 13, color: "#888", marginTop: 18 }}>Already have an account? <span onClick={() => !loading && setPage("login")} style={{ color: "#7c5cff", cursor: "pointer", fontWeight: 600 }}>Log in</span></p>
            </form>
          )}
          {page === "verify-otp" && (
            <form onSubmit={handleVerifyOtp}>
              <p style={{ fontSize: 13, color: "#999", marginBottom: 18 }}>OTP sent to <b style={{ color: "#ddd" }}>{otpForm.email}</b></p>
              <Field label="Email" type="email" name="email" value={otpForm.email} onChange={onChange(setOtpForm)} />
              <Field label="OTP" name="otp" maxLength={6} value={otpForm.otp} onChange={onChange(setOtpForm)} />
              <Button type="submit" loading={loading} style={{ width: "100%" }}>Verify OTP</Button>
              <p style={{ textAlign: "center", fontSize: 13, color: "#888", marginTop: 18 }}>Didn't get the code? <span onClick={() => !loading && handleResendOtp()} style={{ color: "#7c5cff", cursor: "pointer", fontWeight: 600 }}>Resend OTP</span></p>
            </form>
          )}
          {page === "login" && (
            <form onSubmit={handleLogin}>
              <Field label="Email" type="email" name="email" value={loginForm.email} onChange={onChange(setLoginForm)} />
              <Field label="Password" type="password" name="password" value={loginForm.password} onChange={onChange(setLoginForm)} />
              <Button type="submit" loading={loading} style={{ width: "100%" }}>Log in</Button>
              <p style={{ textAlign: "center", fontSize: 13, color: "#888", marginTop: 18 }}>New here? <span onClick={() => !loading && setPage("register")} style={{ color: "#7c5cff", cursor: "pointer", fontWeight: 600 }}>Create an account</span></p>
            </form>
          )}
        </Card>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <Toast {...toast} onClose={() => setToast({ message: "", type: "" })} />
      <Navbar user={user} isAdmin={isAdmin} search={search} setSearch={setSearch} cartCount={cart.length} wishlistCount={wishlist.length} onCartClick={() => setPage("cart")} onWishlistClick={() => setPage("wishlist")} onLogout={handleLogout} onHome={() => setPage("dashboard")} onOrders={openOrders} onAdminOrders={openAdminOrders} onAnalytics={openAnalytics} onLoginClick={() => setPage("login")} />
      <CategoryBar category={category} onPick={(c) => { setCategory(c); setPage("dashboard"); }} />

      <div style={{ display: "flex", flexWrap: "wrap", gap: 20, padding: 20, paddingTop: 150, alignItems: "flex-start", justifyContent: page === "dashboard" ? "flex-start" : "center" }}>
        <div style={{ flex: "1 1 300px", minWidth: 0 }}>
          {page === "dashboard" && (
            <>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
                {isAdmin && (
                  <>
                    <label style={{ padding: "10px 16px", borderRadius: 8, border: "1px solid #333", color: "#ccc", fontSize: 14, cursor: "pointer" }}>
                      📄 Bulk Upload CSV
                      <input type="file" accept=".csv" onChange={handleBulkUpload} style={{ display: "none" }} />
                    </label>
                    <Button onClick={openAddForm}>+ Add Product</Button>
                  </>
                )}
              </div>

              {showForm && (
                <form onSubmit={handleSaveProduct} style={{ background: "#161616", border: "1px solid #262626", borderRadius: 12, padding: 20, marginBottom: 24 }}>
                  <h3 style={{ color: "#f0f0f0", marginTop: 0 }}>{editingId ? "Edit Product" : "New Product"}</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14 }}>
                    <Field label="Name" name="name" value={productForm.name} onChange={onChange(setProductForm)} />
                    <Select label="Gender" name="gender" options={GENDERS} value={productForm.gender} onChange={onChange(setProductForm)} />
                    <Select label="Category" name="category" options={CATEGORIES} value={productForm.category} onChange={onChange(setProductForm)} />
                    <Field label="Brand" name="brand" value={productForm.brand} onChange={onChange(setProductForm)} />
                    <Field label="Price" type="number" name="price" value={productForm.price} onChange={onChange(setProductForm)} />
                    <Field label="Stock" type="number" name="stock" value={productForm.stock} onChange={onChange(setProductForm)} />
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <label style={{ display: "block", fontSize: 13, color: "#9a9a9a", marginBottom: 6 }}>Description</label>
                    <textarea name="description" value={productForm.description} onChange={onChange(setProductForm)} style={{ ...inputStyle, minHeight: 70, fontFamily: "inherit" }} />
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <label style={{ display: "block", fontSize: 13, color: "#9a9a9a", marginBottom: 6 }}>Product Images (admin only)</label>
                    <input type="file" accept="image/*" multiple onChange={(e) => setImageFiles(Array.from(e.target.files))} style={{ ...inputStyle, padding: "8px 0" }} />
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <Button type="submit" loading={loading}>{editingId ? "Update" : "Create"}</Button>
                    <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
                  </div>
                </form>
              )}

              {filteredProducts.length === 0 ? <p style={{ color: "#888", textAlign: "center" }}>No products found.</p> : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
                  {filteredProducts.map((p) => <ProductCard key={p._id} p={p} isAdmin={isAdmin} wishlisted={isWishlisted(p._id)} onView={openProductDetail} onEdit={openEditForm} onDelete={handleDeleteProduct} onToggleWishlist={handleToggleWishlist} />)}
                </div>
              )}
            </>
          )}

          {page === "product-detail" && selectedProduct && <ProductDetail p={selectedProduct} wishlisted={isWishlisted(selectedProduct._id)} onBack={backToDashboard} onAddToCart={handleAddToCart} onBuyNow={goToPayment} onToggleWishlist={handleToggleWishlist} reviewForm={reviewForm} setReviewForm={setReviewForm} onSubmitReview={handleSubmitReview} />}
          {page === "cart" && <CartPage cart={cart} onBack={backToDashboard} onQty={handleQty} onRemove={handleRemoveFromCart} onBuyNow={goToPayment} />}
          {page === "wishlist" && <WishlistPage wishlist={wishlist} onBack={backToDashboard} onView={openProductDetail} onToggleWishlist={handleToggleWishlist} />}
          {page === "payment" && <PaymentPage items={checkoutItems} onBack={() => setPage("dashboard")} onPay={handlePay} loading={loading} />}
          {page === "order-success" && <OrderSuccessPage order={lastOrder} onContinue={backToDashboard} />}
          {page === "orders" && <OrdersPage orders={orders} onBack={backToDashboard} />}
          {page === "admin-orders" && <AdminOrdersPage orders={allOrders} filters={orderFilters} setFilters={setOrderFilters} onApply={fetchAllOrders} onBack={backToDashboard} onStatusChange={handleStatusChange} />}
          {page === "analytics" && <AnalyticsPage stats={stats} onBack={backToDashboard} />}
        </div>
      </div>
      <Footer />
    </div>
  );
}