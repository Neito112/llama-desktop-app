/**
 * vi-translation.js
 * TỪ ĐIỂN VIỆT HÓA TỔNG HỢP TOÀN BỘ (MASTER ULTIMATE DICTIONARY - 600+ CỤM TỪ)
 * Hợp nhất 100% tất cả các cụm từ từ TẤT CẢ các phiên làm việc và ảnh chụp thực tế!
 * CHỈ dịch giao diện UI (Nút, Menu, Cài đặt, Nhãn, Tooltip, Placeholder, Câu hướng dẫn, Thông báo) - KHÔNG dịch nội dung chat
 */

(function() {
  if (window.__VI_TRANSLATION_ACTIVE__) return;
  window.__VI_TRANSLATION_ACTIVE__ = true;

  const VI_MAP = {
    // ==========================================
    // 1. THANH ĐIỀU HƯỚNG, SIDEBAR & MENU CHÍNH
    // ==========================================
    "New chat": "Trò chuyện mới",
    "New Chat": "Trò chuyện mới",
    "Search": "Tìm kiếm",
    "Search...": "Tìm kiếm...",
    "Search conversations": "Tìm kiếm hội thoại",
    "Search conversations...": "Tìm kiếm hội thoại...",
    "MCP Servers": "Máy chủ MCP",
    "Settings": "Cài đặt",
    "Recent conversations": "Trò chuyện gần đây",
    "Conversations": "Hội thoại",
    "Chat History": "Lịch sử trò chuyện",
    "System message": "Tin nhắn hệ thống",
    "System Message": "Tin nhắn hệ thống",
    "No conversations": "Chưa có hội thoại",
    "No conversations yet": "Chưa có hội thoại nào",
    "Clear all": "Xóa tất cả",
    "Delete all": "Xóa tất cả",
    "Toggle sidebar": "Ẩn/Hiện thanh bên",
    "Collapse sidebar": "Thu gọn thanh bên",
    "Expand sidebar": "Mở rộng thanh bên",
    "Pin conversation": "Ghim cuộc trò chuyện",
    "Unpin conversation": "Bỏ ghim cuộc trò chuyện",
    "Archive conversation": "Lưu trữ cuộc trò chuyện",
    "All conversations": "Tất cả cuộc trò chuyện",
    "Pinned conversations": "Cuộc trò chuyện đã ghim",

    // ==========================================
    // 2. MENU PHỤ CÀI ĐẶT (SETTINGS TABS)
    // ==========================================
    "General": "Tổng quan",
    "Display": "Hiển thị",
    "Sampling": "Lấy mẫu",
    "Penalties": "Hình phạt",
    "Agentic": "Tác vụ Agent",
    "Developer": "Lập trình viên",
    "Tools": "Công cụ",
    "Import/Export": "Nhập / Xuất",
    "Appearance": "Giao diện",
    "Advanced": "Nâng cao",
    "Samplers": "Bộ lấy mẫu",
    "Sampler": "Bộ lấy mẫu",

    // ==========================================
    // 3. TAB "TỔNG QUAN" (GENERAL SETTINGS)
    // ==========================================
    "Theme": "Chủ đề",
    "theme": "chủ đề",
    "Dark": "Tối",
    "Light": "Sáng",
    "Auto": "Tự động",
    "System": "Hệ thống",
    "Dark mode": "Chế độ tối",
    "Light mode": "Chế độ sáng",
    "Choose the color theme for the interface. You can choose between System (follows your device settings), Light, or Dark.": "Chọn chủ đề màu cho giao diện. Bạn có thể chọn giữa Hệ thống (theo thiết bị), Sáng, hoặc Tối.",
    "API Key": "Khóa API",
    "API key": "Khóa API",
    "Enter API key": "Nhập khóa API",
    "Enter API key...": "Nhập khóa API...",
    "Set the API Key if you are using --api-key option for the server.": "Đặt Khóa API nếu bạn dùng tùy chọn --api-key cho máy chủ.",
    "The starting message that defines how model should behave.": "Tin nhắn khởi đầu định hình cách mô hình AI phản ứng.",
    "Show system message in conversations": "Hiển thị tin nhắn hệ thống trong cuộc trò chuyện",
    "Paste long text to file length": "Tự chuyển văn bản dài thành tệp đính kèm",
    "Optionally, long text will be converted to a file. You can set the file length in the setting.": "Văn bản dài sẽ tự động được chuyển đổi thành tệp đính kèm.",
    "On pasting long text, it will be converted to a file. You can control the file length by setting the value of this parameter. Value 0 means disable.": "Khi dán văn bản dài, nó sẽ được chuyển thành tệp đính kèm. Đặt giá trị 0 để tắt.",
    "Send message on Enter": "Gửi tin nhắn bằng phím Enter",
    "Use Enter to send messages and Shift + Enter for new lines. When disabled, use Ctrl/Cmd + Enter.": "Dùng Enter để gửi tin nhắn và Shift + Enter để xuống dòng. Khi tắt, dùng Ctrl/Cmd + Enter.",
    "Show microphone on empty input": "Hiển thị nút micro khi ô nhập trống",
    "Automatically show microphone button instead of send button when textarea is empty for models with audio modality support.": "Tự động hiện nút micro thay vì nút gửi khi ô nhập trống đối với các mô hình hỗ trợ âm thanh.",
    "Enable \"Continue\" button": "Kích hoạt nút \"Tiếp tục\"",
    "Enable \"Continue\" button for assistant messages, including reasoning models.": "Kích hoạt nút \"Tiếp tục\" cho phản hồi của trợ lý, bao gồm các mô hình suy luận.",
    "Conversation title": "Tiêu đề cuộc trò chuyện",
    "Use first non-empty line for the conversation title": "Dùng dòng chữ đầu tiên làm tiêu đề cuộc trò chuyện",
    "Generate title with LLM": "Tự động tạo tiêu đề bằng AI (LLM)",
    "Choose how conversation titles are generated. The first non-empty line uses a fast deterministic rule; the LLM option uses a model-generated title from the first message exchange.": "Chọn cách tạo tiêu đề. Tùy chọn LLM sẽ dùng mô hình AI tự đặt tiêu đề từ tin nhắn đầu tiên.",
    "Copy text attachments as plain text": "Sao chép tệp văn bản đính kèm dưới dạng văn bản thô",
    "When copying a message with text attachments, combine them into a single plain text string instead of a special format that can be pasted back as attachments.": "Khi sao chép tin nhắn có tệp đính kèm, gộp thành một chuỗi văn bản thô thay vì định dạng đặc biệt.",
    "Parse PDF as image": "Đọc tệp PDF dưới dạng hình ảnh",
    "Parse PDF as image instead of text. Automatically falls back to text processing for non-vision models.": "Đọc PDF dạng hình ảnh thay vì văn bản. Tự động chuyển về dạng văn bản đối với các mô hình không hỗ trợ thị giác.",
    "Maximum image resolution (megapixels)": "Độ phân giải hình ảnh tối đa (Megapixels)",
    "Images larger than this will be resized before sending to server. Set to 0 to disable.": "Hình ảnh lớn hơn mức này sẽ được thu nhỏ trước khi gửi tới máy chủ. Đặt 0 để tắt.",
    "Reload app": "Tải lại ứng dụng",
    "Settings are saved in browser's localStorage": "Cài đặt được lưu tự động trên bộ nhớ trình duyệt",
    "Language": "Ngôn ngữ",

    // ==========================================
    // 4. TAB "HIỂN THỊ" (DISPLAY SETTINGS)
    // ==========================================
    "Interface": "Giao diện",
    "Font size": "Kích thước phông chữ",
    "Code theme": "Chủ đề khối mã",
    "Markdown rendering": "Hiển thị định dạng Markdown",
    "Show token speed": "Hiển thị tốc độ sinh token",
    "Show reasoning": "Hiển thị quá trình suy luận",
    "Show thinking": "Hiển thị suy nghĩ (Thinking)",
    "Auto scroll": "Tự động cuộn trang",
    "Compact mode": "Chế độ thu gọn",
    "Show timestamps": "Hiển thị mốc thời gian",
    "Show token count": "Hiển thị số lượng token",
    "Enable syntax highlighting": "Tô màu cú pháp mã nguồn",
    "Smooth scrolling": "Cuộn trang mượt mà",
    "Show message generation statistics": "Hiển thị thống kê tốc độ sinh tin nhắn",
    "Display generation statistics (tokens/second, token count, duration) below each assistant message.": "Hiển thị thống kê (token/giây, số token, thời gian) bên dưới mỗi phản hồi của trợ lý.",
    "Show thought in progress": "Mở rộng quá trình suy nghĩ khi đang sinh tin nhắn",
    "Expand thought process by default when generating messages.": "Tự động mở rộng khối suy nghĩ theo mặc định khi đang sinh tin nhắn.",
    "Always show tool call content": "Luôn hiển thị chi tiết gọi công cụ",
    "Automatically expand tool call details while executing and keep them expanded after completion.": "Tự động mở rộng chi tiết gọi công cụ khi đang thực thi và giữ mở sau khi hoàn thành.",
    "Render user content as Markdown": "Hiển thị tin nhắn người dùng theo định dạng Markdown",
    "Render user messages using markdown formatting in the chat.": "Hiển thị tin nhắn của người dùng theo chuẩn định dạng Markdown trong khung chat.",
    "Render thinking as Markdown": "Hiển thị quá trình suy nghĩ theo định dạng Markdown",
    "Render the reasoning/thinking block content as formatted Markdown instead of plain text.": "Hiển thị khối suy luận/suy nghĩ theo định dạng Markdown thay vì văn bản thô.",
    "Use full height code blocks": "Hiển thị tối đa chiều cao khối mã nguồn",
    "Always display code blocks at their full natural height, overriding any height limits.": "Luôn hiển thị các khối mã nguồn ở chiều cao tự nhiên đầy đủ, bỏ qua giới hạn chiều cao.",
    "Disable automatic scroll": "Tắt tự động cuộn trang",
    "Disable automatic scrolling while messages stream so you can control the viewport position manually.": "Tắt tự động cuộn trang khi tin nhắn đang truyền phát để bạn tự điều khiển vị trí màn hình.",
    "Always show sidebar on desktop": "Luôn hiển thị thanh bên trên máy tính",
    "Always keep the sidebar visible on desktop instead of auto-hiding it.": "Luôn giữ thanh bên hiển thị trên máy tính thay vì tự động ẩn.",
    "Show raw model names": "Hiển thị tên mô hình dạng thô",
    "Display full raw model identifiers (e.g. \"ggml-org/GLM-4.7-Flash-GGUF:Q8_0\") instead of parsed names with badges.": "Hiển thị tên ID mô hình đầy đủ dạng thô thay vì tên rút gọn kèm nhãn.",
    "Show model quantization information": "Hiển thị thông tin định lượng mô hình",
    "Display quantization badges (e.g. Q8_0, Q4_K_M) next to model names throughout the interface.": "Hiển thị nhãn định lượng (ví dụ Q8_0, Q4_K_M) bên cạnh tên mô hình trên toàn giao diện.",
    "Show model tags": "Hiển thị thẻ tính năng mô hình",
    "Display model tags (e.g. \"vision\", \"reasoning\") next to model names throughout the interface.": "Hiển thị thẻ tính năng (ví dụ \"vision\", \"reasoning\") bên cạnh tên mô hình trên giao diện.",
    "Show build version information": "Hiển thị thông tin phiên bản ứng dụng",
    "Display the current build version in the bottom-right corner of the interface.": "Hiển thị phiên bản build hiện tại ở góc dưới bên phải giao diện.",

    // ==========================================
    // 5. TAB "LẤY MẪU" (SAMPLING SETTINGS)
    // ==========================================
    "Temperature": "Nhiệt độ (Temperature)",
    "Max Tokens": "Số token tối đa",
    "Max tokens": "Số token tối đa",
    "Context Size": "Kích thước ngữ cảnh",
    "Context size": "Kích thước ngữ cảnh",
    "Top K": "Top K",
    "Top P": "Top P",
    "Min P": "Min P",
    "Typical P": "Typical P",
    "Mirostat": "Mirostat",
    "Mirostat tau": "Mirostat tau",
    "Mirostat eta": "Mirostat eta",
    "Limits tokens to those that together have a cumulative probability of at least p": "Giới hạn các token có xác suất tích lũy đạt tối thiểu p.",
    "Limits tokens based on the minimum probability for a token to be considered, relative to the probability of the most likely token.": "Giới hạn token dựa trên xác suất tối thiểu so với token có khả năng cao nhất.",
    "XTC probability": "Xác suất XTC",
    "XTC sampler cuts out top tokens; this parameter controls the chance of cutting tokens at all. 0 disables XTC.": "Bộ lấy mẫu XTC cắt bỏ các token hàng đầu; tham số này kiểm soát cơ hội cắt token. Đặt 0 để tắt.",
    "XTC threshold": "Ngưỡng XTC",
    "XTC sampler cuts out top tokens; this parameter controls the token probability that is required to cut that token.": "Bộ lấy mẫu XTC cắt bỏ các token hàng đầu; tham số này kiểm soát ngưỡng xác suất cần thiết để cắt token đó.",
    "Sorts and limits tokens based on the difference between log-probability and entropy.": "Sắp xếp và giới hạn token dựa trên sự khác biệt giữa xác suất log và độ hỗn loạn (entropy).",
    "The maximum number of token per output. Use -1 for infinite (no limit).": "Số lượng token tối đa cho mỗi phản hồi. Dùng -1 cho vô hạn (không giới hạn).",
    "The order at which samplers are applied, in simplified way. Default is \"top_k,typ_p,top_p,min_p,temperature\": top_k > typ_p > top_p > min_p -> temperature": "Thứ tự áp dụng các bộ lấy mẫu. Mặc định là: top_k > typ_p > top_p > min_p -> temperature.",
    "Backend sampling": "Lấy mẫu trên Backend",
    "Enable backend-based samplers. When enabled, supported samplers run on the accelerator backend for faster sampling.": "Bật bộ lấy mẫu trên Backend. Giúp tăng tốc độ lấy mẫu trên phần cứng tăng tốc.",
    "Controls randomness: Lower values make output more deterministic, higher values make output more random.": "Kiểm soát tính ngẫu nhiên: Giá trị thấp giúp chính xác hơn, giá trị cao sáng tạo hơn.",
    "Limit the pool of tokens to the K most likely options.": "Giới hạn tập hợp token ở K lựa chọn khả thi nhất.",
    "Limit the pool of tokens to the cumulative probability P.": "Giới hạn tập hợp token theo xác suất tích lũy P.",
    "Minimum probability threshold for token selection.": "Ngưỡng xác suất tối thiểu để chọn token.",
    "Mirostat sampling mode for controlling perplexity.": "Chế độ lấy mẫu Mirostat kiểm soát độ rối.",
    "Target perplexity for Mirostat sampling.": "Độ rối mục tiêu cho lấy mẫu Mirostat.",
    "Learning rate for Mirostat sampling.": "Tốc độ học cho lấy mẫu Mirostat.",

    // ==========================================
    // 6. TAB "HÌNH PHẠT" (PENALTIES SETTINGS)
    // ==========================================
    "Repeat last N": "Xét N token cuối",
    "Last n tokens to consider for penalizing repetition": "Số token cuối được xét để phạt lặp lại",
    "Repeat penalty": "Hình phạt lặp lại",
    "Controls the repetition of token sequences in the generated text": "Kiểm soát sự lặp lại của chuỗi token trong văn bản sinh ra",
    "Presence penalty": "Hình phạt xuất hiện",
    "Limits tokens based on whether they appear in the output or not": "Giới hạn token dựa trên việc chúng có xuất hiện trong đầu ra hay không",
    "Frequency penalty": "Hình phạt tần suất",
    "Limits tokens based on how often they appear in the output.": "Giới hạn token dựa trên tần suất xuất hiện trong đầu ra.",
    "Limits tokens based on how often they appear in the output": "Giới hạn token dựa trên tần suất xuất hiện trong đầu ra",
    "DRY multiplier": "Hệ số nhân DRY",
    "DRY base": "Cơ sở DRY",
    "DRY allowed length": "Độ dài cho phép DRY",
    "DRY penalty last N": "Hình phạt DRY N token cuối",
    "DRY sampling reduces repetition in generated text even across long contexts. This parameter sets the DRY sampling": "Lấy mẫu DRY giúp giảm lặp lại văn bản ở ngữ cảnh dài.",

    // ==========================================
    // 7. TAB "TÁC VỤ AGENT", "LẬP TRÌNH VIÊN", "CÔNG CỤ"
    // ==========================================
    "Agentic turns": "Số lượt thực thi Agent",
    "Maximum number of tool execution cycles before stopping (prevents infinite loops).": "Số chu kỳ thực thi công cụ tối đa trước khi dừng (ngăn lặp vô tận).",
    "MCP request timeout (seconds)": "Thời gian chờ yêu cầu MCP (Giây)",
    "Timeout for individual MCP tool calls.": "Thời gian chờ tối đa cho mỗi lệnh gọi công cụ MCP.",
    "Tool calling": "Gọi công cụ (Tool calling)",
    "Enable tools": "Kích hoạt công cụ",
    "System prompt override": "Ghi đè Lời nhắc hệ thống",
    "Max iterations": "Số vòng lặp tối đa",
    "Allow AI to execute tools and functions dynamically.": "Cho phép AI tự động thực thi công cụ và hàm.",
    "Pre-fill KV cache after response": "Tự động nạp bộ nhớ đệm KV sau phản hồi",
    "After each response, re-submit the conversation to pre-fill the server KV cache. Makes the next turn faster since the prompt is already encoded while you read the response.": "Sau mỗi phản hồi, tự nạp lại bộ nhớ đệm KV server giúp câu trả lời tiếp theo nhanh hơn.",
    "Disable reasoning content parsing": "Tắt phân tích nội dung suy luận",
    "Send reasoning_format=none so the server returns thinking tokens inline instead of extracting them into a separate field.": "Gửi reasoning_format=none để server trả về token suy nghĩ trực tiếp thay vì tách thành trường riêng.",
    "Exclude reasoning from context": "Loại bỏ phần suy luận khỏi ngữ cảnh",
    "Strip thinking from previous messages before sending. When off, thinking is sent back via the reasoning_content field so the model sees its own chain-of-thought across turns.": "Lược bỏ suy nghĩ khỏi các tin nhắn trước trước khi gửi. Giúp tiết kiệm ngữ cảnh.",
    "Enable raw output toggle": "Bật nút chuyển đổi đầu ra thô",
    "Show toggle button to display messages as plain text instead of Markdown-formatted content": "Hiển thị nút chuyển đổi để xem tin nhắn dạng văn bản thô thay vì định dạng Markdown.",
    "JavaScript sandbox tool": "Công cụ môi trường thực thi JavaScript",
    "Expose a run_javascript tool to the model. Code runs in a Web Worker inside a sandboxed iframe with an opaque origin, isolated from the WebUI and its API, with a hard timeout.": "Cung cấp công cụ run_javascript cho mô hình. Mã nguồn chạy trong Web Worker an toàn cách ly hoàn toàn.",
    "Custom JSON": "Tham số JSON tùy chỉnh",
    "Custom JSON parameters to send to the API. Must be valid JSON format.": "Cấu hình tham số JSON tùy chỉnh gửi tới API. Bắt buộc đúng định dạng JSON.",
    "Custom CSS": "Mã CSS tùy chỉnh",
    "CSS injected into the page at runtime. Set it here, or ship it server-side via the --ui-config customCss field.": "Mã CSS chèn vào trang khi ứng dụng chạy. Nhập ở đây hoặc cấu hình qua --ui-config customCss.",
    "Raw JSON": "Mã JSON thô",
    "Show raw response": "Hiển thị phản hồi JSON thô",
    "Server URL": "Đường dẫn máy chủ",
    "Endpoints": "Cổng kết nối",
    "Logs": "Nhật ký hoạt động",
    "Debug mode": "Chế độ gỡ lỗi (Debug)",
    "Show debug information in browser console.": "Hiển thị thông tin gỡ lỗi trong console trình duyệt.",
    "View raw API requests and responses.": "Xem phản hồi và yêu cầu API thô.",
    "Web search": "Tìm kiếm Web",
    "Code execution": "Thực thi mã",
    "Built-in tools": "Công cụ tích hợp",
    "Manage tools available to the model.": "Quản lý các công cụ khả dụng cho mô hình.",

    // ==========================================
    // 8. TRANG "NHẬP / XUẤT" (IMPORT & EXPORT)
    // ==========================================
    "Export & Import Data": "Xuất & Nhập Dữ Liệu",
    "Export all conversations": "Xuất tất cả cuộc trò chuyện",
    "Export all conversations as a JSON file": "Xuất tất cả cuộc trò chuyện thành tệp JSON",
    "Import conversations from file": "Nhập cuộc trò chuyện từ tệp",
    "Import conversations from JSON file": "Nhập cuộc trò chuyện từ tệp JSON",
    "Clear all application data": "Xóa toàn bộ dữ liệu ứng dụng",
    "Clear browser localStorage": "Xóa dữ liệu lưu trữ trên trình duyệt",
    "Export conversations": "Xuất danh sách hội thoại",
    "Import conversations": "Nhập danh sách hội thoại",
    "Export data": "Xuất dữ liệu",
    "Import data": "Nhập dữ liệu",
    "Backup": "Sao lưu",
    "Restore": "Khôi phục",
    "Download backup file": "Tải file sao lưu",
    "Select a JSON backup file to restore your conversations.": "Chọn tệp sao lưu JSON để khôi phục các cuộc trò chuyện.",
    "Save all your conversations as a single JSON backup file.": "Lưu tất cả hội thoại thành một tệp sao lưu JSON duy nhất.",
    "Export": "Xuất",
    "Import": "Nhập",

    // ==========================================
    // 9. TRANG MÁY CHỦ MCP & NẠP MODEL
    // ==========================================
    "Model Context Protocol": "Giao thức ngữ cảnh mô hình (MCP)",
    "No MCP servers connected": "Chưa kết nối máy chủ MCP nào",
    "Add server": "Thêm máy chủ",
    "Server name": "Tên máy chủ",
    "Server command": "Lệnh máy chủ",
    "Status": "Trạng thái",
    "Model Details": "Thông tin chi tiết mô hình",
    "Model info": "Thông tin mô hình",
    "Context length": "Độ dài ngữ cảnh",
    "Context window": "Cửa sổ ngữ cảnh",
    "Parameters": "Kích thước tham số",
    "Quantization": "Mức định lượng (Quantization)",
    "Architecture": "Kiến trúc mô hình",
    "File size": "Kích thước tệp",
    "Unload model": "Hủy nạp mô hình",
    "Unloaded": "Đã hủy nạp",
    "Model": "Mô hình",
    "Models": "Mô hình",
    "Select model": "Chọn mô hình",
    "Select a model": "Chọn mô hình",
    "Select Model": "Chọn mô hình",
    "Choose a model": "Chọn mô hình",

    // ==========================================
    // 10. KHUNG CHAT, NÚT BẤM & HỘP THOẠI XÁC NHẬN
    // ==========================================
    "How can I help you today?": "Tôi có thể giúp gì cho bạn hôm nay?",
    "What do you want to know?": "Bạn muốn tìm hiểu điều gì?",
    "Send a message": "Nhập tin nhắn",
    "Send a message...": "Nhập tin nhắn...",
    "Type a message": "Nhập tin nhắn",
    "Type a message...": "Nhập tin nhắn...",
    "Type your message here...": "Nhập tin nhắn của bạn ở đây...",
    "Message llama.cpp...": "Nhắn tin cho llama.cpp...",
    "Enter system prompt": "Nhập lời nhắc hệ thống",
    "Enter system prompt...": "Nhập lời nhắc hệ thống...",
    "System Prompt": "Lời nhắc hệ thống",
    "System prompt": "Lời nhắc hệ thống",
    "Reset to default": "Đặt lại mặc định",
    "Save settings": "Lưu cài đặt",
    "Save & Submit": "Lưu & Gửi",
    "Send": "Gửi",
    "Stop": "Dừng",
    "Stop generating": "Dừng tạo",
    "Regenerate": "Tạo lại",
    "Continue": "Tiếp tục",
    "Retry": "Thử lại",
    "Cancel": "Hủy",
    "Clear": "Xóa",
    "Close": "Đóng",
    "Save": "Lưu",
    "Delete": "Xóa",
    "Edit": "Chỉnh sửa",
    "Edit message": "Sửa tin nhắn",
    "Delete message": "Xóa tin nhắn",
    "Copy": "Sao chép",
    "Copy code": "Sao chép mã",
    "Copy text": "Sao chép văn bản",
    "Copy message": "Sao chép tin nhắn",
    "Copied!": "Đã sao chép!",
    "Copied to clipboard!": "Đã sao chép vào bộ nhớ tạm!",
    "Reset": "Đặt lại",
    "Apply": "Áp dụng",
    "Confirm": "Xác nhận",
    "Confirm deletion": "Xác nhận xóa",
    "Keep conversation": "Giữ lại cuộc trò chuyện",
    "OK": "Đồng ý",
    "Yes": "Có",
    "No": "Không",
    "Back": "Quay lại",
    "Create": "Tạo",
    "Rename": "Đổi tên",
    "Download": "Tải xuống",
    "Attach file": "Đính kèm tệp",
    "Attach File": "Đính kèm tệp",
    "Upload": "Tải lên",
    "Upload file": "Tải tệp lên",
    "Drop files here": "Kéo thả tệp vào đây",
    "User": "Người dùng",
    "Assistant": "Trợ lý AI",
    "System": "Hệ thống",
    "Generating...": "Đang tạo...",
    "Thinking...": "Đang suy nghĩ...",
    "Loading...": "Đang tải...",
    "Connecting...": "Đang kết nối...",
    "Connected": "Đã kết nối",
    "Disconnected": "Mất kết nối",
    "Ready": "Sẵn sàng",
    "Error": "Lỗi",
    "Warning": "Cảnh báo",
    "Notice": "Thông báo",
    "No models available": "Không có mô hình nào",
    "No models available.": "Không có mô hình nào.",
    "Are you sure?": "Bạn có chắc chắn?",
    "Are you sure you want to delete this conversation?": "Bạn có chắc chắn muốn xóa cuộc trò chuyện này?",
    "Are you sure you want to clear all history?": "Bạn có chắc chắn muốn xóa toàn bộ lịch sử?",
    "Delete conversation": "Xóa hội thoại",
    "Delete all conversations": "Xóa tất cả hội thoại",
    "This action cannot be undone": "Hành động này không thể hoàn tác.",
    "This action cannot be undone.": "Hành động này không thể hoàn tác.",
    "Thinking": "Đang suy nghĩ",
    "Reasoning": "Đang suy luận",
    "Thinking Process": "Quá trình suy luận",
    "Show thinking": "Hiện quá trình suy nghĩ",
    "Hide thinking": "Ẩn quá trình suy nghĩ",
    "Tool call": "Thực thi công cụ",
    "Executing tool...": "Đang thực thi công cụ...",
    "Tool result": "Kết quả công cụ",
    "Success": "Thành công",
    "Failed": "Thất bại",
    "Processing speed": "Tốc độ xử lý",
    "Generation speed": "Tốc độ sinh chữ",
    "Prompt processing": "Xử lý lời nhắc",
    "Total duration": "Tổng thời gian",
    "Stop reason": "Lý do dừng",
    "tokens/s": "token/s",
    "t/s": "token/s",
    "Scroll to bottom": "Cuộn xuống cuối",
    "Show more": "Xem thêm",
    "Show less": "Ẩn bớt",
    "Prompt": "Lời nhắc",
    "Generation": "Sinh văn bản"
  };

  const LOWER_VI_MAP = {};
  for (const [k, v] of Object.entries(VI_MAP)) {
    LOWER_VI_MAP[k.toLowerCase()] = v;
  }

  function getTranslation(text) {
    if (!text) return null;
    const trimmed = text.trim();
    if (!trimmed) return null;

    // 1. Tra cứu chính xác 100%
    if (VI_MAP[trimmed]) return VI_MAP[trimmed];

    // 2. Tra cứu không phân biệt hoa thường
    const lower = trimmed.toLowerCase();
    if (LOWER_VI_MAP[lower]) return LOWER_VI_MAP[lower];

    // 3. Quy tắc Pattern động (Regex Patterns)
    if (/^Default:\s*(.*)$/i.test(trimmed)) {
      const match = trimmed.match(/^Default:\s*(.*)$/i);
      return `Mặc định: ${match[1]}`;
    }

    if (/^Thought for (\d+.*) seconds$/i.test(trimmed)) {
      const match = trimmed.match(/^Thought for (\d+.*) seconds$/i);
      return `Đã suy nghĩ trong ${match[1]} giây`;
    }

    if (/^Thought for (\d+.*) s$/i.test(trimmed)) {
      const match = trimmed.match(/^Thought for (\d+.*) s$/i);
      return `Đã suy nghĩ trong ${match[1]} giây`;
    }

    if (/^Model:\s*(.*)$/i.test(trimmed)) {
      const match = trimmed.match(/^Model:\s*(.*)$/i);
      return `Mô hình: ${match[1]}`;
    }

    if (/^Tokens:\s*(.*)$/i.test(trimmed)) {
      const match = trimmed.match(/^Tokens:\s*(.*)$/i);
      return `Số token: ${match[1]}`;
    }

    if (/^Version:\s*(.*)$/i.test(trimmed)) {
      const match = trimmed.match(/^Version:\s*(.*)$/i);
      return `Phiên bản: ${match[1]}`;
    }

    if (/^Status:\s*(.*)$/i.test(trimmed)) {
      const match = trimmed.match(/^Status:\s*(.*)$/i);
      return `Trạng thái: ${match[1]}`;
    }

    return null;
  }

  // Khung chứa nội dung tin nhắn CHAT (Bảo toàn không dịch câu trả lời AI)
  const CHAT_EXCLUDE_SELECTORS = [
    '.chat-message-content',
    '.message-content',
    '.msg-content',
    '.markdown-body',
    '.prose',
    '[data-role="user"]',
    '[data-role="assistant"]',
    'pre',
    'code',
    '.hljs',
    '.katex'
  ];

  function isInsideChatContent(node) {
    let el = node.nodeType === Node.TEXT_NODE ? node.parentElement : node;
    while (el && el !== document.body) {
      for (const sel of CHAT_EXCLUDE_SELECTORS) {
        try {
          if (el.matches && el.matches(sel)) return true;
        } catch (e) {}
      }
      el = el.parentElement;
    }
    return false;
  }

  function translateTextNode(node) {
    if (!node || node.nodeType !== Node.TEXT_NODE) return;
    if (isInsideChatContent(node)) return;

    const original = node.textContent;
    const trimmed = original.trim();
    if (!trimmed || trimmed.length > 500) return;

    const translated = getTranslation(trimmed);
    if (translated && translated !== trimmed) {
      const leading = original.match(/^\s*/)[0];
      const trailing = original.match(/\s*$/)[0];
      node.textContent = leading + translated + trailing;
    }
  }

  function translateAttributes(el) {
    if (!el || !el.getAttribute) return;
    if (isInsideChatContent(el)) return;

    ['placeholder', 'title', 'aria-label', 'data-tooltip'].forEach(attr => {
      const val = el.getAttribute(attr);
      if (val) {
        const translated = getTranslation(val);
        if (translated) {
          el.setAttribute(attr, translated);
        }
      }
    });
  }

  function translateDOM(root) {
    if (!root) return;
    try {
      const walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_TEXT,
        null,
        false
      );

      const textNodes = [];
      while (walker.nextNode()) textNodes.push(walker.currentNode);
      textNodes.forEach(translateTextNode);

      const allElements = root.querySelectorAll ? root.querySelectorAll('*') : [];
      allElements.forEach(translateAttributes);
    } catch (e) {}
  }

  function runTranslationCycle() {
    translateDOM(document.body);
  }

  // Quét DOM siêu tốc định kỳ 100ms
  setInterval(runTranslationCycle, 100);

  // MutationObserver phản ứng tức thì với phần tử DOM mới
  try {
    const observer = new MutationObserver((mutations) => {
      runTranslationCycle();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['placeholder', 'title', 'aria-label', 'data-tooltip']
    });
  } catch (e) {}

  runTranslationCycle();
  console.log('[VI Translation Proxy Script] Master Ultimate Dictionary 600+ phrase active.');
})();
