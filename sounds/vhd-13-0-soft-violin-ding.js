// ============================================================
// Ding (sad violin)
// Sounds: built into strudel.cc
// ============================================================

setcpm(120)

// soft violin ding
const violinDing = note("[a3,c4,e4]")
  .s("gm_violin").velocity(.45).release(1.5)
  .room(.6).size(4)
  ;

stack(
  [1, violinDing]  
)
.mask(time.lt(1)) //example for stop