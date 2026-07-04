
// import React, { useState, useEffect } from "react";

// const SERVER = "http://localhost:5005";
// const AUTH_API = `${SERVER}/api/auth`;
// const PRODUCT_API = `${SERVER}/api/products`;
// const ORDER_API = `${SERVER}/api/orders`;

// const GENDERS = ["Men", "Women", "Kids"];
// const CATEGORIES = [
//   "Tops & Upper Body", "Bottoms & Lower Body", "One-Piece Garments", "Activewear & Sportswear",
//   "Outerwear & Cold Weather", "Sleepwear & Undergarments", "Ethnic & Traditional", "Formal & Evening Wear",
// ];
// const TRACK_STEPS = ["Placed", "Shipped", "Out for Delivery", "Delivered"];

// const emptyRegister = { name: "", email: "", password: "" };
// const emptyOtp = { email: "", otp: "" };
// const emptyLogin = { email: "", password: "" };
// const emptyProduct = { name: "", description: "", price: "", category: CATEGORIES[0], gender: GENDERS[0], brand: "", stock: "" };
// const emptyAddress = { fullName: "", phone: "", address: "" };

// const inputStyle = {
//   width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #333",
//   background: "#1a1a1a", color: "#f0f0f0", fontSize: 14, outline: "none",
//   boxSizing: "border-box", marginBottom: 14,
// };

// function Toast({ message, type, onClose }) {
//   if (!message) return null;
//   return (
//     <div onClick={onClose} style={{
//       position: "fixed", top: 70, right: 20, zIndex: 200,
//       background: type === "error" ? "#3a1414" : "#123324",
//       border: `1px solid ${type === "error" ? "#8a3a3a" : "#2e8b57"}`,
//       color: type === "error" ? "#ff8f8f" : "#7de3a4",
//       padding: "12px 18px", borderRadius: 8, fontSize: 14,
//       cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.4)", maxWidth: 320,
//     }}>
//       {message}
//     </div>
//   );
// }

// function Field({ label, ...props }) {
//   return (
//     <div style={{ textAlign: "left" }}>
//       <label style={{ display: "block", fontSize: 13, color: "#9a9a9a", marginBottom: 6 }}>{label}</label>
//       <input {...props} style={inputStyle} />
//     </div>
//   );
// }

// function Select({ label, options, ...props }) {
//   return (
//     <div style={{ textAlign: "left" }}>
//       <label style={{ display: "block", fontSize: 13, color: "#9a9a9a", marginBottom: 6 }}>{label}</label>
//       <select {...props} style={inputStyle}>
//         {options.map((o) => <option key={o} value={o}>{o}</option>)}
//       </select>
//     </div>
//   );
// }

// function Button({ children, loading, variant, ...props }) {
//   const bg = variant === "danger" ? "#c0392b" : variant === "ghost" ? "transparent" : variant === "buy" ? "#ff5c9e" : loading ? "#5a4bb0" : "#7c5cff";
//   return (
//     <button {...props} disabled={loading || props.disabled} style={{
//       padding: "10px 16px", borderRadius: 8,
//       border: variant === "ghost" ? "1px solid #333" : "none",
//       background: bg, color: "#fff", fontSize: 14, fontWeight: 600,
//       cursor: loading ? "not-allowed" : "pointer", ...props.style,
//     }}>
//       {loading ? "Please wait..." : children}
//     </button>
//   );
// }

// function BackButton({ onClick }) {
//   return (
//     <button type="button" onClick={onClick} title="Back" style={{
//       position: "absolute", top: 18, left: 18, width: 32, height: 32, borderRadius: 8,
//       border: "1px solid #2a2a2a", background: "#161616", color: "#bbb", fontSize: 16,
//       cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
//     }}>
//       ←
//     </button>
//   );
// }

// function Card({ children, wide }) {
//   return (
//     <div style={{
//       position: "relative", background: "#121212", border: "1px solid #262626",
//       borderRadius: 16, padding: "32px 28px", width: wide ? 900 : 380,
//       maxWidth: "94vw", boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
//     }}>
//       {children}
//     </div>
//   );
// }

// function ProductImage({ images, style }) {
//   const src = images && images[0] ? `${SERVER}${images[0]}` : null;
//   return src ? (
//     <img src={src} alt="product" style={{ width: "100%", objectFit: "cover", borderRadius: 10, ...style }} />
//   ) : (
//     <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#1a1a1a", borderRadius: 10, fontSize: 40, color: "#444", ...style }}>🖼️</div>
//   );
// }

// function Navbar({ user, isAdmin, search, setSearch, cartCount, onCartClick, onLogout, onHome, onOrders, onAdminOrders }) {
//   return (
//     <div style={{ position: "sticky", top: 0, zIndex: 50, display: "flex", alignItems: "center", gap: 16, background: "#161616", borderBottom: "1px solid #262626", padding: "12px 24px" }}>
//       <h2 onClick={onHome} style={{ color: "#7c5cff", margin: 0, cursor: "pointer", whiteSpace: "nowrap" }}>🛍️ ShopNest</h2>
//       <input placeholder="Search for products..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ ...inputStyle, marginBottom: 0, flex: 1, maxWidth: 480 }} />
//       <div style={{ flex: 1 }} />
//       {isAdmin && <span onClick={onAdminOrders} style={{ color: "#aaa", fontSize: 13, cursor: "pointer" }}>🗂 All Orders</span>}
//       <span onClick={onOrders} style={{ color: "#aaa", fontSize: 13, cursor: "pointer" }}>📦 My Orders</span>
//       <span style={{ color: "#aaa", fontSize: 13 }}>{user?.name} • {isAdmin ? "Admin" : "Customer"}</span>
//       <button onClick={onCartClick} style={{ position: "relative", background: "transparent", border: "none", color: "#f0f0f0", fontSize: 22, cursor: "pointer" }}>
//         🛒
//         {cartCount > 0 && <span style={{ position: "absolute", top: -6, right: -10, background: "#ff5c9e", color: "#fff", borderRadius: "50%", fontSize: 11, width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>{cartCount}</span>}
//       </button>
//       <Button variant="ghost" onClick={onLogout}>Logout</Button>
//     </div>
//   );
// }

// function Sidebar({ gender, setGender, category, setCategory }) {
//   const item = (active, label, onClick) => (
//     <div onClick={onClick} style={{ padding: "8px 10px", borderRadius: 8, cursor: "pointer", fontSize: 14, marginBottom: 4, color: active ? "#fff" : "#999", background: active ? "#7c5cff" : "transparent" }}>
//       {label}
//     </div>
//   );
//   return (
//     <div style={{ width: 210, flexShrink: 0, background: "#121212", border: "1px solid #262626", borderRadius: 12, padding: 16, height: "fit-content" }}>
//       <h4 style={{ color: "#f0f0f0", margin: "0 0 10px" }}>Shop By</h4>
//       {item(!gender, "All", () => setGender(""))}
//       {GENDERS.map((g) => item(gender === g, g, () => setGender(g)))}
//       <h4 style={{ color: "#f0f0f0", margin: "16px 0 10px" }}>Category</h4>
//       {item(!category, "All", () => setCategory(""))}
//       {CATEGORIES.map((c) => item(category === c, c, () => setCategory(c)))}
//     </div>
//   );
// }

// function ProductCard({ p, isAdmin, onView, onEdit, onDelete }) {
//   return (
//     <div onClick={() => onView(p)} style={{ background: "#161616", border: "1px solid #262626", borderRadius: 12, padding: 14, cursor: "pointer" }}>
//       <ProductImage images={p.images} style={{ height: 140, marginBottom: 10 }} />
//       <h3 style={{ margin: "0 0 6px", color: "#f0f0f0", fontSize: 16 }}>{p.name}</h3>
//       <p style={{ margin: "0 0 8px", color: "#888", fontSize: 13 }}>{p.gender} • {p.category}</p>
//       <p style={{ margin: "0 0 12px", color: "#7c5cff", fontWeight: 700, fontSize: 17 }}>₹{p.price}</p>
//       {isAdmin && (
//         <div style={{ display: "flex", gap: 8 }} onClick={(e) => e.stopPropagation()}>
//           <Button variant="ghost" style={{ flex: 1, padding: "6px 0" }} onClick={() => onEdit(p)}>Edit</Button>
//           <Button variant="danger" style={{ flex: 1, padding: "6px 0" }} onClick={() => onDelete(p._id)}>Delete</Button>
//         </div>
//       )}
//     </div>
//   );
// }

// function ProductDetail({ p, onBack, onAddToCart, onBuyNow }) {
//   return (
//     <Card wide>
//       <BackButton onClick={onBack} />
//       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginTop: 20 }}>
//         <ProductImage images={p.images} style={{ height: 320 }} />
//         <div style={{ textAlign: "left" }}>
//           <h2 style={{ color: "#f0f0f0", margin: "0 0 8px" }}>{p.name}</h2>
//           <p style={{ color: "#888", fontSize: 13, margin: "0 0 4px" }}>{p.gender} • {p.category}</p>
//           {p.brand && <p style={{ color: "#888", fontSize: 13, margin: "0 0 4px" }}>Brand: {p.brand}</p>}
//           <p style={{ color: "#888", fontSize: 13, margin: "0 0 16px" }}>Stock: {p.stock} available</p>
//           <p style={{ color: "#7c5cff", fontWeight: 700, fontSize: 26, margin: "0 0 16px" }}>₹{p.price}</p>
//           <p style={{ color: "#ccc", fontSize: 14, lineHeight: 1.6, margin: "0 0 24px" }}>{p.description}</p>
//           <div style={{ display: "flex", gap: 12 }}>
//             <Button variant="ghost" style={{ flex: 1 }} onClick={() => onAddToCart(p)}>🛒 Add to Cart</Button>
//             <Button variant="buy" style={{ flex: 1 }} onClick={() => onBuyNow([{ ...p, quantity: 1 }])}>Buy Now</Button>
//           </div>
//         </div>
//       </div>
//     </Card>
//   );
// }

// function CartPage({ cart, onBack, onRemove, onBuyNow }) {
//   const total = cart.reduce((sum, p) => sum + Number(p.price), 0);
//   return (
//     <Card wide>
//       <BackButton onClick={onBack} />
//       <h2 style={{ color: "#f0f0f0", marginTop: 20 }}>Your Cart ({cart.length})</h2>
//       {cart.length === 0 ? <p style={{ color: "#888" }}>Cart is empty. Go add some products!</p> : (
//         <>
//           {cart.map((p, i) => (
//             <div key={i} style={{ display: "flex", gap: 14, alignItems: "center", background: "#161616", border: "1px solid #262626", borderRadius: 10, padding: 12, marginBottom: 10 }}>
//               <ProductImage images={p.images} style={{ width: 70, height: 70 }} />
//               <div style={{ flex: 1, textAlign: "left" }}>
//                 <p style={{ color: "#f0f0f0", margin: "0 0 4px", fontWeight: 600 }}>{p.name}</p>
//                 <p style={{ color: "#7c5cff", margin: 0, fontWeight: 700 }}>₹{p.price}</p>
//               </div>
//               <Button variant="danger" onClick={() => onRemove(i)}>Remove</Button>
//             </div>
//           ))}
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16 }}>
//             <h3 style={{ color: "#f0f0f0" }}>Total: ₹{total}</h3>
//             <Button variant="buy" onClick={() => onBuyNow(cart.map((p) => ({ ...p, quantity: 1 })))}>Checkout</Button>
//           </div>
//         </>
//       )}
//     </Card>
//   );
// }

// function PaymentPage({ items, onBack, onPay, loading }) {
//   const [address, setAddress] = useState(emptyAddress);
//   const [method, setMethod] = useState("upi");
//   const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
//   const change = (e) => setAddress((a) => ({ ...a, [e.target.name]: e.target.value }));
//   const handlePay = (e) => { e.preventDefault(); if (!address.fullName || !address.phone || !address.address) return; onPay(items, address); };

//   return (
//     <Card wide>
//       <BackButton onClick={onBack} />
//       <h2 style={{ color: "#f0f0f0", marginTop: 20 }}>Checkout</h2>
//       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
//         <form onSubmit={handlePay} style={{ textAlign: "left" }}>
//           <h4 style={{ color: "#f0f0f0" }}>Shipping Address</h4>
//           <Field label="Full name" name="fullName" value={address.fullName} onChange={change} />
//           <Field label="Phone" name="phone" value={address.phone} onChange={change} />
//           <Field label="Address" name="address" value={address.address} onChange={change} />
//           <h4 style={{ color: "#f0f0f0" }}>Payment Method</h4>
//           {["upi", "card", "cod"].map((m) => (
//             <label key={m} style={{ display: "flex", alignItems: "center", gap: 8, color: "#ccc", fontSize: 14, marginBottom: 8, cursor: "pointer" }}>
//               <input type="radio" name="method" checked={method === m} onChange={() => setMethod(m)} />
//               {m === "upi" ? "UPI" : m === "card" ? "Credit / Debit Card" : "Cash on Delivery"}
//             </label>
//           ))}
//           <Button type="submit" variant="buy" loading={loading} style={{ width: "100%", marginTop: 12 }}>Pay ₹{total}</Button>
//           <p style={{ fontSize: 11, color: "#666", marginTop: 10 }}>This is a simulated payment for demo purposes — no real transaction occurs.</p>
//         </form>
//         <div>
//           <h4 style={{ color: "#f0f0f0" }}>Order Summary</h4>
//           {items.map((p, i) => (
//             <div key={i} style={{ display: "flex", justifyContent: "space-between", color: "#ccc", fontSize: 14, marginBottom: 8 }}>
//               <span>{p.name} x {p.quantity}</span><span>₹{p.price * p.quantity}</span>
//             </div>
//           ))}
//           <hr style={{ borderColor: "#333" }} />
//           <div style={{ display: "flex", justifyContent: "space-between", color: "#f0f0f0", fontWeight: 700, fontSize: 16 }}><span>Total</span><span>₹{total}</span></div>
//         </div>
//       </div>
//     </Card>
//   );
// }

// function OrderSuccessPage({ order, onContinue }) {
//   return (
//     <Card>
//       <div style={{ textAlign: "center" }}>
//         <div style={{ fontSize: 48, marginBottom: 10 }}>✅</div>
//         <h2 style={{ color: "#f0f0f0", margin: "0 0 8px" }}>Order Placed!</h2>
//         <p style={{ color: "#888", marginBottom: 4 }}>Order ID: {order?._id}</p>
//         <p style={{ color: "#7c5cff", fontWeight: 700, fontSize: 20, marginBottom: 20 }}>₹{order?.totalAmount}</p>
//         <p style={{ color: "#aaa", fontSize: 14, marginBottom: 24 }}>Your order will be delivered soon. Thanks for shopping with ShopNest!</p>
//         <Button onClick={onContinue} style={{ width: "100%" }}>Continue Shopping</Button>
//       </div>
//     </Card>
//   );
// }

// function Tracker({ status }) {
//   const idx = TRACK_STEPS.indexOf(status);
//   return (
//     <div style={{ display: "flex", alignItems: "center", margin: "14px 0" }}>
//       {TRACK_STEPS.map((step, i) => (
//         <React.Fragment key={step}>
//           <div style={{ textAlign: "center", flex: 1 }}>
//             <div style={{
//               width: 22, height: 22, borderRadius: "50%", margin: "0 auto 4px",
//               background: i <= idx ? "#7c5cff" : "#333", color: "#fff", fontSize: 12,
//               display: "flex", alignItems: "center", justifyContent: "center",
//             }}>{i <= idx ? "✓" : i + 1}</div>
//             <span style={{ fontSize: 11, color: i <= idx ? "#f0f0f0" : "#666" }}>{step}</span>
//           </div>
//           {i < TRACK_STEPS.length - 1 && <div style={{ flex: 1, height: 2, background: i < idx ? "#7c5cff" : "#333", marginTop: -18 }} />}
//         </React.Fragment>
//       ))}
//     </div>
//   );
// }

// function OrdersPage({ orders, onBack }) {
//   return (
//     <Card wide>
//       <BackButton onClick={onBack} />
//       <h2 style={{ color: "#f0f0f0", marginTop: 20 }}>My Orders</h2>
//       {orders.length === 0 ? <p style={{ color: "#888" }}>No orders yet.</p> : orders.map((o) => (
//         <div key={o._id} style={{ background: "#161616", border: "1px solid #262626", borderRadius: 10, padding: 16, marginBottom: 14, textAlign: "left" }}>
//           <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
//             <span style={{ color: "#f0f0f0", fontWeight: 600 }}>Order #{o._id.slice(-6)}</span>
//             {o.estimatedDelivery && <span style={{ color: "#888", fontSize: 12 }}>Est. delivery: {new Date(o.estimatedDelivery).toLocaleDateString()}</span>}
//           </div>
//           {o.orderStatus !== "Cancelled" ? <Tracker status={o.orderStatus} /> : <p style={{ color: "#ff8f8f" }}>Order Cancelled</p>}
//           {o.items.map((it, i) => <p key={i} style={{ color: "#ccc", fontSize: 13, margin: "2px 0" }}>{it.name} x {it.quantity} — ₹{it.price * it.quantity}</p>)}
//           <p style={{ color: "#7c5cff", fontWeight: 700, marginTop: 6 }}>Total: ₹{o.totalAmount}</p>
//         </div>
//       ))}
//     </Card>
//   );
// }

// function AdminOrdersPage({ orders, onBack, onStatusChange }) {
//   return (
//     <Card wide>
//       <BackButton onClick={onBack} />
//       <h2 style={{ color: "#f0f0f0", marginTop: 20 }}>All Orders (Admin)</h2>
//       {orders.length === 0 ? <p style={{ color: "#888" }}>No orders yet.</p> : orders.map((o) => (
//         <div key={o._id} style={{ background: "#161616", border: "1px solid #262626", borderRadius: 10, padding: 16, marginBottom: 14, textAlign: "left" }}>
//           <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
//             <span style={{ color: "#f0f0f0", fontWeight: 600 }}>Order #{o._id.slice(-6)}</span>
//             <select value={o.orderStatus} onChange={(e) => onStatusChange(o._id, e.target.value)} style={{ ...inputStyle, width: "auto", marginBottom: 0, padding: "4px 8px" }}>
//               {[...TRACK_STEPS, "Cancelled"].map((s) => <option key={s} value={s}>{s}</option>)}
//             </select>
//           </div>
//           <p style={{ color: "#888", fontSize: 13, margin: "0 0 6px" }}>Customer: {o.user?.name} ({o.user?.email})</p>
//           {o.items.map((it, i) => <p key={i} style={{ color: "#ccc", fontSize: 13, margin: "2px 0" }}>{it.name} x {it.quantity} — ₹{it.price * it.quantity}</p>)}
//           <p style={{ color: "#7c5cff", fontWeight: 700, marginTop: 6 }}>Total: ₹{o.totalAmount}</p>
//         </div>
//       ))}
//     </Card>
//   );
// }

// export default function App() {
//   const [page, setPage] = useState("register");
//   const [registerForm, setRegisterForm] = useState(emptyRegister);
//   const [otpForm, setOtpForm] = useState(emptyOtp);
//   const [loginForm, setLoginForm] = useState(emptyLogin);
//   const [loading, setLoading] = useState(false);
//   const [toast, setToast] = useState({ message: "", type: "" });
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null);

//   const [products, setProducts] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [cart, setCart] = useState([]);
//   const [checkoutItems, setCheckoutItems] = useState([]);
//   const [lastOrder, setLastOrder] = useState(null);
//   const [orders, setOrders] = useState([]);
//   const [allOrders, setAllOrders] = useState([]);
//   const [search, setSearch] = useState("");
//   const [gender, setGender] = useState("");
//   const [category, setCategory] = useState("");
//   const [showForm, setShowForm] = useState(false);
//   const [productForm, setProductForm] = useState(emptyProduct);
//   const [imageFiles, setImageFiles] = useState([]);
//   const [editingId, setEditingId] = useState(null);

//   const isAdmin = user?.role === "admin";
//   const authPage = ["register", "verify-otp", "login"].includes(page);

//   const showToast = (message, type = "success") => { setToast({ message, type }); setTimeout(() => setToast({ message: "", type: "" }), 3500); };
//   const onChange = (setter) => (e) => setter((p) => ({ ...p, [e.target.name]: e.target.value }));

//   const apiJSON = async (base, endpoint, body, method = "POST", auth = false) => {
//     const res = await fetch(`${base}${endpoint}`, {
//       method, headers: { "Content-Type": "application/json", ...(auth ? { Authorization: `Bearer ${token}` } : {}) },
//       body: body ? JSON.stringify(body) : undefined,
//     });
//     const data = await res.json().catch(() => ({}));
//     if (!res.ok) throw new Error(data.message || "Something went wrong");
//     return data;
//   };

//   const apiForm = async (endpoint, formData, method = "POST") => {
//     const res = await fetch(`${PRODUCT_API}${endpoint}`, { method, headers: { Authorization: `Bearer ${token}` }, body: formData });
//     const data = await res.json().catch(() => ({}));
//     if (!res.ok) throw new Error(data.message || "Something went wrong");
//     return data;
//   };

//   // ---- Auth ----
//   const handleRegister = async (e) => {
//     e.preventDefault();
//     if (!registerForm.name || !registerForm.email || !registerForm.password) return showToast("Please fill all fields", "error");
//     setLoading(true);
//     try {
//       const data = await apiJSON(AUTH_API, "/register", registerForm);
//       showToast(data.message || "OTP sent to your email");
//       setOtpForm({ email: registerForm.email, otp: "" });
//       setPage("verify-otp");
//     } catch (err) { showToast(err.message, "error"); } finally { setLoading(false); }
//   };

//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     if (!otpForm.email || !otpForm.otp) return showToast("Enter email and OTP", "error");
//     setLoading(true);
//     try {
//       const data = await apiJSON(AUTH_API, "/verify-otp", otpForm);
//       showToast(data.message || "Email verified successfully");
//       setLoginForm({ email: otpForm.email, password: "" });
//       setPage("login");
//     } catch (err) { showToast(err.message, "error"); } finally { setLoading(false); }
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (!loginForm.email || !loginForm.password) return showToast("Enter email and password", "error");
//     setLoading(true);
//     try {
//       const data = await apiJSON(AUTH_API, "/login", loginForm);
//       showToast(data.message || "Login successful");
//       setUser(data.user); setToken(data.token); setPage("dashboard");
//     } catch (err) { showToast(err.message, "error"); } finally { setLoading(false); }
//   };

//   const handleResendOtp = async () => {
//     if (!otpForm.email) return showToast("Enter your email first", "error");
//     setLoading(true);
//     try {
//       const data = await apiJSON(AUTH_API, "/register", { ...registerForm, email: otpForm.email });
//       showToast(data.message || "New OTP sent");
//     } catch (err) { showToast(err.message, "error"); } finally { setLoading(false); }
//   };

//   const handleLogout = () => {
//     setUser(null); setToken(null); setProducts([]); setCart([]);
//     setRegisterForm(emptyRegister); setOtpForm(emptyOtp); setLoginForm(emptyLogin);
//     setPage("login");
//   };

//   const backFromOtp = () => { setRegisterForm((p) => ({ ...p, email: otpForm.email || p.email })); setPage("register"); };
//   const backFromLogin = () => { setRegisterForm((p) => ({ ...p, email: loginForm.email || p.email })); setPage("register"); };

//   // ---- Products ----
//   const fetchProducts = async () => {
//     try { const data = await apiJSON(PRODUCT_API, "/", null, "GET"); setProducts(data.products || []); }
//     catch (err) { showToast(err.message, "error"); }
//   };
//   useEffect(() => { if (page === "dashboard") fetchProducts(); }, [page]);

//   const openAddForm = () => { setProductForm(emptyProduct); setImageFiles([]); setEditingId(null); setShowForm(true); };
//   const openEditForm = (p) => {
//     setProductForm({ name: p.name, description: p.description, price: p.price, category: p.category, gender: p.gender, brand: p.brand || "", stock: p.stock });
//     setImageFiles([]); setEditingId(p._id); setShowForm(true);
//   };

//   const handleSaveProduct = async (e) => {
//     e.preventDefault();
//     const { name, description, price, category, gender, stock } = productForm;
//     if (!name || !description || !price || !category || !gender) return showToast("Please fill all fields", "error");
//     setLoading(true);
//     try {
//       const fd = new FormData();
//       Object.entries(productForm).forEach(([k, v]) => fd.append(k, v));
//       imageFiles.forEach((file) => fd.append("images", file));
//       if (editingId) { await apiForm(`/${editingId}`, fd, "PUT"); showToast("Product updated"); }
//       else { await apiForm("/", fd, "POST"); showToast("Product created"); }
//       setShowForm(false); fetchProducts();
//     } catch (err) { showToast(err.message, "error"); } finally { setLoading(false); }
//   };

//   const handleDeleteProduct = async (id) => {
//     if (!window.confirm("Delete this product?")) return;
//     try { await apiJSON(PRODUCT_API, `/${id}`, null, "DELETE", true); showToast("Product deleted"); fetchProducts(); }
//     catch (err) { showToast(err.message, "error"); }
//   };

//   const openProductDetail = (p) => { setSelectedProduct(p); setPage("product-detail"); };
//   const backToDashboard = () => { setSelectedProduct(null); setPage("dashboard"); };
//   const handleAddToCart = (p) => { setCart((c) => [...c, p]); showToast(`${p.name} added to cart`); };
//   const handleRemoveFromCart = (index) => setCart((c) => c.filter((_, i) => i !== index));

//   // ---- Checkout / Payment / Orders ----
//   const goToPayment = (items) => { setCheckoutItems(items); setPage("payment"); };

//   const handlePay = async (items, shippingAddress) => {
//     setLoading(true);
//     try {
//       const payload = { items: items.map((i) => ({ product: i._id, name: i.name, price: i.price, quantity: i.quantity })), shippingAddress };
//       const data = await apiJSON(ORDER_API, "", payload, "POST", true);
//       setLastOrder(data.order); setCart([]); showToast("Payment successful!"); setPage("order-success");
//     } catch (err) { showToast(err.message, "error"); } finally { setLoading(false); }
//   };

//   const fetchOrders = async () => {
//     try { const data = await apiJSON(ORDER_API, "/my", null, "GET", true); setOrders(data.orders || []); }
//     catch (err) { showToast(err.message, "error"); }
//   };
//   const openOrders = () => { fetchOrders(); setPage("orders"); };

//   const fetchAllOrders = async () => {
//     try { const data = await apiJSON(ORDER_API, "/", null, "GET", true); setAllOrders(data.orders || []); }
//     catch (err) { showToast(err.message, "error"); }
//   };
//   const openAdminOrders = () => { fetchAllOrders(); setPage("admin-orders"); };

//   const handleStatusChange = async (id, orderStatus) => {
//     try { await apiJSON(ORDER_API, `/${id}/status`, { orderStatus }, "PUT", true); showToast("Status updated"); fetchAllOrders(); }
//     catch (err) { showToast(err.message, "error"); }
//   };

//   const filteredProducts = products.filter(
//     (p) => (!gender || p.gender === gender) && (!category || p.category === category) && p.name.toLowerCase().includes(search.toLowerCase())
//   );

//   if (authPage) {
//     return (
//       <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0a0a0a", fontFamily: "'Segoe UI', system-ui, sans-serif", padding: 20, boxSizing: "border-box" }}>
//         <Toast {...toast} onClose={() => setToast({ message: "", type: "" })} />
//         <Card>
//           {page === "verify-otp" && <BackButton onClick={backFromOtp} />}
//           {page === "login" && <BackButton onClick={backFromLogin} />}
//           <div style={{ textAlign: "center", marginBottom: 24 }}>
//             <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 48, height: 48, borderRadius: 12, background: "linear-gradient(135deg, #7c5cff, #ff5c9e)", fontSize: 22, marginBottom: 10 }}>🛍️</div>
//             <h1 style={{ fontSize: 20, fontWeight: 700, color: "#f0f0f0", margin: 0 }}>ShopNest</h1>
//           </div>

//           {page === "register" && (
//             <form onSubmit={handleRegister}>
//               <Field label="Full name" name="name" value={registerForm.name} onChange={onChange(setRegisterForm)} />
//               <Field label="Email" type="email" name="email" value={registerForm.email} onChange={onChange(setRegisterForm)} />
//               <Field label="Password" type="password" name="password" value={registerForm.password} onChange={onChange(setRegisterForm)} />
//               <Button type="submit" loading={loading} style={{ width: "100%" }}>Create account</Button>
//               <p style={{ textAlign: "center", fontSize: 13, color: "#888", marginTop: 18 }}>Already have an account? <span onClick={() => !loading && setPage("login")} style={{ color: "#7c5cff", cursor: "pointer", fontWeight: 600 }}>Log in</span></p>
//             </form>
//           )}

//           {page === "verify-otp" && (
//             <form onSubmit={handleVerifyOtp}>
//               <p style={{ fontSize: 13, color: "#999", marginBottom: 18 }}>OTP sent to <b style={{ color: "#ddd" }}>{otpForm.email}</b></p>
//               <Field label="Email" type="email" name="email" value={otpForm.email} onChange={onChange(setOtpForm)} />
//               <Field label="OTP" name="otp" maxLength={6} value={otpForm.otp} onChange={onChange(setOtpForm)} />
//               <Button type="submit" loading={loading} style={{ width: "100%" }}>Verify OTP</Button>
//               <p style={{ textAlign: "center", fontSize: 13, color: "#888", marginTop: 18 }}>Didn't get the code? <span onClick={() => !loading && handleResendOtp()} style={{ color: "#7c5cff", cursor: "pointer", fontWeight: 600 }}>Resend OTP</span></p>
//             </form>
//           )}

//           {page === "login" && (
//             <form onSubmit={handleLogin}>
//               <Field label="Email" type="email" name="email" value={loginForm.email} onChange={onChange(setLoginForm)} />
//               <Field label="Password" type="password" name="password" value={loginForm.password} onChange={onChange(setLoginForm)} />
//               <Button type="submit" loading={loading} style={{ width: "100%" }}>Log in</Button>
//               <p style={{ textAlign: "center", fontSize: 13, color: "#888", marginTop: 18 }}>New here? <span onClick={() => !loading && setPage("register")} style={{ color: "#7c5cff", cursor: "pointer", fontWeight: 600 }}>Create an account</span></p>
//             </form>
//           )}
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div style={{ minHeight: "100vh", background: "#0a0a0a", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
//       <Toast {...toast} onClose={() => setToast({ message: "", type: "" })} />
//       <Navbar
//         user={user} isAdmin={isAdmin} search={search} setSearch={setSearch}
//         cartCount={cart.length} onCartClick={() => setPage("cart")}
//         onLogout={handleLogout} onHome={() => setPage("dashboard")} onOrders={openOrders} onAdminOrders={openAdminOrders}
//       />

//       <div style={{ display: "flex", gap: 20, padding: 24, alignItems: "flex-start", justifyContent: page === "dashboard" ? "flex-start" : "center" }}>
//         {page === "dashboard" && <Sidebar gender={gender} setGender={setGender} category={category} setCategory={setCategory} />}

//         <div style={{ flex: page === "dashboard" ? 1 : "unset" }}>
//           {page === "dashboard" && (
//             <>
//               <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
//                 {isAdmin && <Button onClick={openAddForm}>+ Add Product</Button>}
//               </div>

//               {showForm && (
//                 <form onSubmit={handleSaveProduct} style={{ background: "#161616", border: "1px solid #262626", borderRadius: 12, padding: 20, marginBottom: 24 }}>
//                   <h3 style={{ color: "#f0f0f0", marginTop: 0 }}>{editingId ? "Edit Product" : "New Product"}</h3>
//                   <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
//                     <Field label="Name" name="name" value={productForm.name} onChange={onChange(setProductForm)} />
//                     <Select label="Gender" name="gender" options={GENDERS} value={productForm.gender} onChange={onChange(setProductForm)} />
//                     <Select label="Category" name="category" options={CATEGORIES} value={productForm.category} onChange={onChange(setProductForm)} />
//                     <Field label="Brand" name="brand" value={productForm.brand} onChange={onChange(setProductForm)} />
//                     <Field label="Price" type="number" name="price" value={productForm.price} onChange={onChange(setProductForm)} />
//                     <Field label="Stock" type="number" name="stock" value={productForm.stock} onChange={onChange(setProductForm)} />
//                   </div>
//                   <div style={{ textAlign: "left" }}>
//                     <label style={{ display: "block", fontSize: 13, color: "#9a9a9a", marginBottom: 6 }}>Description</label>
//                     <textarea name="description" value={productForm.description} onChange={onChange(setProductForm)} style={{ ...inputStyle, minHeight: 70, fontFamily: "inherit" }} />
//                   </div>
//                   <div style={{ textAlign: "left" }}>
//                     <label style={{ display: "block", fontSize: 13, color: "#9a9a9a", marginBottom: 6 }}>Product Images (only admin can upload)</label>
//                     <input type="file" accept="image/*" multiple onChange={(e) => setImageFiles(Array.from(e.target.files))} style={{ ...inputStyle, padding: "8px 0" }} />
//                   </div>
//                   <div style={{ display: "flex", gap: 10 }}>
//                     <Button type="submit" loading={loading}>{editingId ? "Update" : "Create"}</Button>
//                     <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
//                   </div>
//                 </form>
//               )}

//               {filteredProducts.length === 0 ? <p style={{ color: "#888", textAlign: "center" }}>No products found.</p> : (
//                 <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
//                   {filteredProducts.map((p) => <ProductCard key={p._id} p={p} isAdmin={isAdmin} onView={openProductDetail} onEdit={openEditForm} onDelete={handleDeleteProduct} />)}
//                 </div>
//               )}
//             </>
//           )}

//           {page === "product-detail" && selectedProduct && <ProductDetail p={selectedProduct} onBack={backToDashboard} onAddToCart={handleAddToCart} onBuyNow={goToPayment} />}
//           {page === "cart" && <CartPage cart={cart} onBack={backToDashboard} onRemove={handleRemoveFromCart} onBuyNow={goToPayment} />}
//           {page === "payment" && <PaymentPage items={checkoutItems} onBack={() => setPage("dashboard")} onPay={handlePay} loading={loading} />}
//           {page === "order-success" && <OrderSuccessPage order={lastOrder} onContinue={backToDashboard} />}
//           {page === "orders" && <OrdersPage orders={orders} onBack={backToDashboard} />}
//           {page === "admin-orders" && <AdminOrdersPage orders={allOrders} onBack={backToDashboard} onStatusChange={handleStatusChange} />}
//         </div>
//       </div>
//     </div>
//   );
// }

// --------------------------------


import React, { useState, useEffect } from "react";

const SERVER = "http://localhost:5005";
const AUTH_API = `${SERVER}/api/auth`;
const PRODUCT_API = `${SERVER}/api/products`;
const ORDER_API = `${SERVER}/api/orders`;
const CART_API = `${SERVER}/api/cart`;
const WISHLIST_API = `${SERVER}/api/wishlist`;
const PAYMENT_API = `${SERVER}/api/payment`;

const GENDERS = ["Men", "Women", "Kids"];
const CATEGORIES = [
  "Tops & Upper Body", "Bottoms & Lower Body", "One-Piece Garments", "Activewear & Sportswear",
  "Outerwear & Cold Weather", "Sleepwear & Undergarments", "Ethnic & Traditional", "Formal & Evening Wear",
];
const TRACK_STEPS = ["Placed", "Shipped", "Out for Delivery", "Delivered"];

const emptyRegister = { name: "", email: "", password: "" };
const emptyOtp = { email: "", otp: "" };
const emptyLogin = { email: "", password: "" };
const emptyProduct = { name: "", description: "", price: "", category: CATEGORIES[0], gender: GENDERS[0], brand: "", stock: "" };
const emptyAddress = { fullName: "", phone: "", address: "" };

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

function Navbar({ user, isAdmin, search, setSearch, cartCount, wishlistCount, onCartClick, onWishlistClick, onLogout, onHome, onOrders, onAdminOrders }) {
  return (
    <div style={{ position: "sticky", top: 0, zIndex: 50, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 14, background: "#161616", borderBottom: "1px solid #262626", padding: "12px 20px" }}>
      <h2 onClick={onHome} style={{ color: "#7c5cff", margin: 0, cursor: "pointer", whiteSpace: "nowrap" }}>🛍️ ShopNest</h2>
      <input placeholder="Search for products..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ ...inputStyle, marginBottom: 0, flex: "1 1 200px", maxWidth: 480 }} />
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 14, marginLeft: "auto" }}>
        {isAdmin && <span onClick={onAdminOrders} style={{ color: "#aaa", fontSize: 13, cursor: "pointer" }}>🗂 All Orders</span>}
        <span onClick={onOrders} style={{ color: "#aaa", fontSize: 13, cursor: "pointer" }}>📦 My Orders</span>
        <span onClick={onWishlistClick} style={{ position: "relative", color: "#aaa", fontSize: 20, cursor: "pointer" }}>
          ❤️{wishlistCount > 0 && <span style={{ position: "absolute", top: -6, right: -10, background: "#ff5c9e", color: "#fff", borderRadius: "50%", fontSize: 11, width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>{wishlistCount}</span>}
        </span>
        <span style={{ color: "#aaa", fontSize: 13 }}>{user?.name} • {isAdmin ? "Admin" : "Customer"}</span>
        <button onClick={onCartClick} style={{ position: "relative", background: "transparent", border: "none", color: "#f0f0f0", fontSize: 22, cursor: "pointer" }}>
          🛒{cartCount > 0 && <span style={{ position: "absolute", top: -6, right: -10, background: "#ff5c9e", color: "#fff", borderRadius: "50%", fontSize: 11, width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>{cartCount}</span>}
        </button>
        <Button variant="ghost" onClick={onLogout}>Logout</Button>
      </div>
    </div>
  );
}

function Sidebar({ gender, setGender, category, setCategory }) {
  const item = (active, label, onClick) => <div onClick={onClick} style={{ padding: "8px 10px", borderRadius: 8, cursor: "pointer", fontSize: 14, marginBottom: 4, color: active ? "#fff" : "#999", background: active ? "#7c5cff" : "transparent" }}>{label}</div>;
  return (
    <div style={{ width: 210, flexShrink: 0, background: "#121212", border: "1px solid #262626", borderRadius: 12, padding: 16, height: "fit-content" }}>
      <h4 style={{ color: "#f0f0f0", margin: "0 0 10px" }}>Shop By</h4>
      {item(!gender, "All", () => setGender(""))}
      {GENDERS.map((g) => item(gender === g, g, () => setGender(g)))}
      <h4 style={{ color: "#f0f0f0", margin: "16px 0 10px" }}>Category</h4>
      {item(!category, "All", () => setCategory(""))}
      {CATEGORIES.map((c) => item(category === c, c, () => setCategory(c)))}
    </div>
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

function AdminOrdersPage({ orders, onBack, onStatusChange }) {
  return (
    <Card wide>
      <BackButton onClick={onBack} />
      <h2 style={{ color: "#f0f0f0", marginTop: 20 }}>All Orders (Admin)</h2>
      {orders.length === 0 ? <p style={{ color: "#888" }}>No orders yet.</p> : orders.map((o) => (
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

export default function App() {
  const [page, setPage] = useState("register");
  const [registerForm, setRegisterForm] = useState(emptyRegister);
  const [otpForm, setOtpForm] = useState(emptyOtp);
  const [loginForm, setLoginForm] = useState(emptyLogin);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "" });
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [lastOrder, setLastOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
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
  const handleLogout = () => { setUser(null); setToken(null); setProducts([]); setCart([]); setWishlist([]); setRegisterForm(emptyRegister); setOtpForm(emptyOtp); setLoginForm(emptyLogin); setPage("login"); };
  const backFromOtp = () => { setRegisterForm((p) => ({ ...p, email: otpForm.email || p.email })); setPage("register"); };
  const backFromLogin = () => { setRegisterForm((p) => ({ ...p, email: loginForm.email || p.email })); setPage("register"); };

  // ---- Products ----
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

  const openProductDetail = (p) => { setSelectedProduct(p); setReviewForm({ rating: 5, comment: "" }); setPage("product-detail"); };
  const backToDashboard = () => { setSelectedProduct(null); setPage("dashboard"); };

  // ---- Cart (backend-persisted) ----
  const fetchCart = async () => { try { const data = await apiJSON(CART_API, "", null, "GET", true); setCart(data.items || []); } catch { } };
  useEffect(() => { if (token) fetchCart(); }, [token]);

  const handleAddToCart = async (p) => {
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

  // ---- Wishlist ----
  const fetchWishlist = async () => { try { const data = await apiJSON(WISHLIST_API, "", null, "GET", true); setWishlist(data.products || []); } catch { } };
  useEffect(() => { if (token) fetchWishlist(); }, [token]);
  const handleToggleWishlist = async (p) => {
    try { const data = await apiJSON(WISHLIST_API, "/toggle", { productId: p._id }, "POST", true); showToast(data.message); fetchWishlist(); } catch (err) { showToast(err.message, "error"); }
  };
  const isWishlisted = (id) => wishlist.some((p) => p._id === id);

  // ---- Reviews ----
  const handleSubmitReview = async () => {
    try { const data = await apiJSON(PRODUCT_API, `/${selectedProduct._id}/reviews`, reviewForm, "POST", true); showToast("Review added"); setSelectedProduct(data.product); setReviewForm({ rating: 5, comment: "" }); fetchProducts(); }
    catch (err) { showToast(err.message, "error"); }
  };

  // ---- Checkout / Payment / Orders ----
  const goToPayment = (items) => { setCheckoutItems(items); setPage("payment"); };

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
  const openOrders = () => { fetchOrders(); setPage("orders"); };
  const fetchAllOrders = async () => { try { const data = await apiJSON(ORDER_API, "/", null, "GET", true); setAllOrders(data.orders || []); } catch (err) { showToast(err.message, "error"); } };
  const openAdminOrders = () => { fetchAllOrders(); setPage("admin-orders"); };
  const handleStatusChange = async (id, orderStatus) => { try { await apiJSON(ORDER_API, `/${id}/status`, { orderStatus }, "PUT", true); showToast("Status updated"); fetchAllOrders(); } catch (err) { showToast(err.message, "error"); } };

  const filteredProducts = products.filter((p) => (!gender || p.gender === gender) && (!category || p.category === category) && p.name.toLowerCase().includes(search.toLowerCase()));

  if (authPage) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0a0a0a", fontFamily: "'Segoe UI', system-ui, sans-serif", padding: 16, boxSizing: "border-box" }}>
        <Toast {...toast} onClose={() => setToast({ message: "", type: "" })} />
        <Card>
          {page === "verify-otp" && <BackButton onClick={backFromOtp} />}
          {page === "login" && <BackButton onClick={backFromLogin} />}
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
      <Navbar user={user} isAdmin={isAdmin} search={search} setSearch={setSearch} cartCount={cart.length} wishlistCount={wishlist.length} onCartClick={() => setPage("cart")} onWishlistClick={() => setPage("wishlist")} onLogout={handleLogout} onHome={() => setPage("dashboard")} onOrders={openOrders} onAdminOrders={openAdminOrders} />

      <div style={{ display: "flex", flexWrap: "wrap", gap: 20, padding: 20, alignItems: "flex-start", justifyContent: page === "dashboard" ? "flex-start" : "center" }}>
        {page === "dashboard" && <Sidebar gender={gender} setGender={setGender} category={category} setCategory={setCategory} />}

        <div style={{ flex: page === "dashboard" ? "1 1 300px" : "unset", minWidth: 0 }}>
          {page === "dashboard" && (
            <>
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
                {isAdmin && <Button onClick={openAddForm}>+ Add Product</Button>}
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
          {page === "admin-orders" && <AdminOrdersPage orders={allOrders} onBack={backToDashboard} onStatusChange={handleStatusChange} />}
        </div>
      </div>
    </div>
  );
}