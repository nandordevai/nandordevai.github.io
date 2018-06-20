
```ruby
cutoff = 120
s = nil
vol = 0.5

live_loop :sample do
  s = sample :loop_amen, cutoff: cutoff, amp: vol
  sleep sample_duration :loop_amen
end

live_loop :midi do
  use_real_time
  cc, val = sync "/midi/launch_control_xl/2/9/control_change"
  if cc == 77
    vol = val / 127.0 * 2
  elsif cc == 49
    cutoff = 64 + val / 2
  end
  control s, cutoff: cutoff, amp: vol
end
```
